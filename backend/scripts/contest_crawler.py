from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException
import pandas as pd
import json
import threading
import time
from fake_useragent import UserAgent
from categorize import add_categories

# prevent fields that don't exist from causing error
def safe_find_element_text(parent, by, value):
    try:
        return parent.find_element(by, value).text
    except NoSuchElementException:
        return None

# 爬取比賽的標題和連結
def crawlContestTitleLink(driver):
    contestDataList = []
    # 儲存比賽數量
    contestSum = 0
    # 迭代contest的數量
    count = 1

    # 點擊更多按鈕，直到沒有更多按鈕為止
    while True:
        try:
            moreButton = driver.find_element(By.CLASS_NAME, "bh-more-block")
            # 模擬滑鼠點擊更多按鈕
            ActionChains(driver).move_to_element(moreButton).click().perform()
            # 暫停3秒
            time.sleep(5)
        except:
            print('No more button')
            break
            

    # 取得每個比賽的div block
    contests = driver.find_elements(By.CLASS_NAME, "bh-card-item")
    contestSum = len(contests)
    print(contestSum)

    # 當count小於總比賽數量時，執行以下程式
    while count <= contestSum:
        cssSelcector = f"div.row.bh-section.bh-card-list > div:nth-child({count}) > div > div > div.bh-middle > div.bh-title-block > a"
        titleLink = driver.find_element(By.CSS_SELECTOR,cssSelcector)
        title = titleLink.text
        link = titleLink.get_attribute('href')

        # 建立一個Dictionary，用來存放比賽的標題和連結
        titleLinkDict = {
            'title': title,
            'link': link,
        }

        # 將Dictionary存入List
        contestDataList.append(titleLinkDict)
        # df = pd.DataFrame(contestDataList)

        #time.sleep(2)
        count += 1

    saveContestList(contestDataList)

    # 呼叫searchContest函式
    searchContest(driver,contestDataList,contestSum)

# 爬取每個比賽的詳細資訊
def searchContest(driver,contestDataList,contestSum):
    # 計算在contestDataList第幾個比賽
    index = 0
    while index < contestSum:
    
        contestLink = contestDataList[index]['link']
        # 點擊比賽的link
        # 使用ActionChains進行點擊
        driver.get(contestLink)
        time.sleep(2)
        
        # scrape dates
        try:
            parentElement = driver.find_element(By.CSS_SELECTOR, "div.bh-block.bh-range-block")
            dateElements = parentElement.find_elements(By.CLASS_NAME, "bh-value")
            if len(dateElements) > 2:
                contestDataList[index]['startDate'] = dateElements[0].text
                contestDataList[index]['endDate'] = dateElements[2].text
        except NoSuchElementException:
            pass

        # scrape organizer
        organizer_elements = [("bh-item-organizer-title", "organizer"),("bh-item-agency-title", "agency"),("bh-item-contact-phone", "contactPhone"),("bh-item-contact-email", "contactEmail"),("bh-item-location", "location"),]

        try:
            parentElement = driver.find_element(By.CSS_SELECTOR, "div.bh-block.bh-organizer-block")
            for class_name, key in organizer_elements:
                text = safe_find_element_text(parentElement, By.CLASS_NAME, class_name)
                if text is not None and key!='organizer':
                    contestDataList[index][key] = text[text.find('：')+1:]
                elif text is not None:
                    contestDataList[index][key] = text
                
        except NoSuchElementException:
            pass
                
        #scrape tags
        try:
            parentElement = driver.find_element(By.CSS_SELECTOR, "div.bh-block.bh-category-tag-block")
            elements = parentElement.find_elements(By.CLASS_NAME, "bh-value")
            contestDataList[index]['tags'] = [i.text for i in elements]
        except NoSuchElementException:
            pass
        
        try:
            contestDetail = driver.find_element(By.CLASS_NAME, "bh-block.bh-content-block").text
            contestDataList[index]['detail'] = contestDetail
        except NoSuchElementException:
            pass
        
        try:
            bh_cover_image_element = driver.find_element(By.CSS_SELECTOR, ".bh-cover-image")
            contestImageElement = bh_cover_image_element.find_element(By.CLASS_NAME, 'bh-image')
            contestImageUrl = contestImageElement.get_attribute('src')
            contestDataList[index]['coverImg'] = contestImageUrl
            print(contestImageUrl)
        except NoSuchElementException:
            pass

        #scrape info section
        try:
            parentElement = driver.find_element(By.CLASS_NAME, "bh-info-block")
            elements = parentElement.find_elements(By.CLASS_NAME, "bh-item")
            for element in elements:
                key = element.find_element(By.CLASS_NAME, "bh-text")
                value = element.find_element(By.CLASS_NAME, "bh-value")
                if key.text in ['國籍/地區限制','總獎金','最高獎金','身分限制']:
                    contestDataList[index]['nationality' if key.text == '國籍/地區限制' else 'totalPrize' if key.text == '總獎金' else 'maxPrize' if key.text == '最高獎金' else 'ageGroup'] = value.text or ''
        except NoSuchElementException:
            pass
        
        #scrape descriptions
        try:
            contestDetail = driver.find_element(By.CLASS_NAME, "bh-block.bh-content-block").text
            contestDataList[index]['detail'] = contestDetail
        except NoSuchElementException:
            pass
        
        print('Scraped',contestDataList[index]['title'])
        index += 1
    saveContestDetail(contestDataList)

# 將contestDataList存成csv和json檔
def saveContestList(contestDataList):

    # 將contestDataList存成csv和json檔
    df = pd.DataFrame(contestDataList)
    df.to_csv('./contest_data.csv', index=False)
    data = df.to_dict(orient='records')
    with open('./contest_data.json', 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def saveContestDetail(contestDataList):

    # 將contestDataList存成csv和json檔
    df = pd.DataFrame(contestDataList)
    df = df.where(pd.notnull(df), None)
    df = add_categories(df)
    df.to_csv('./contest_detail.csv', index=False)
    data = df.to_dict(orient='records')
    with open('./contest_detail.json', 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    ua = UserAgent()
    user_agent = ua.random
    print(user_agent)  # Optional: Print it out to see what the user agent string looks like.

    # 設定Chrome的選項
    options = webdriver.ChromeOptions()
    prefs = {'profile.default_content_setting_values':{'notifications': 1}}
    options.add_experimental_option('prefs', prefs)
    options.add_argument("disable-infobars")
    
    # Add the random user agent to your options
    options.add_argument(f'user-agent={user_agent}')
    options.add_argument("--enable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure")
    options.add_argument('--ignore-certificate-errors-spki-list')

    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)  
    driver.maximize_window()
    driver.get('https://bhuntr.com/tw/competitions')

    crawlContestTitleLink(driver)
 

