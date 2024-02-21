from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from fake_useragent import UserAgent
import pandas as pd
import time
import random

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

        time.sleep(2)
        count += 1

    saveContestData(contestDataList)

    # 呼叫searchContest函式 
    # searchContest(driver,contestDataList,contestSum)

# 爬取每個比賽的詳細資訊
def searchContest(driver,contestDataList,contestSum):
    # 計算在contestDataList第幾個比賽
    index = 0
    while index < contestSum:
        # 模擬搜尋比賽
        search = driver.find_element(By.CLASS_NAME, "bh-search-input.bh-text-ui")
        # 輸入關鍵字
        search.send_keys(contestDataList[index]['title'])
        # 模擬點擊搜尋按鈕
        search.send_keys(Keys.RETURN)
        time.sleep(2)

        # 取得比賽的link
        contestLink = driver.find_element(By.CLASS_NAME, "bh-title-block")
        # 點擊比賽的link
        # 使用ActionChains進行點擊
        ActionChains(driver).move_to_element(contestLink).click().perform()
        time.sleep(2)
        
        dateInfo = driver.find_element(By.CSS_SELECTOR, "div.bh-block.bh-range-block").text

        contestDetail = driver.find_element(By.CLASS_NAME, "bh-block.bh-content-block").text


        contestDataList[index]['date'] = dateInfo
        contestDataList[index]['detail'] = contestDetail

        index += 1
    
    # saveContestData(contestDataList)

# 將contestDataList存成csv和json檔
def saveContestData(contestDataList):

    # 將contestDataList存成csv和json檔
    df = pd.DataFrame(contestDataList)
    df.to_csv('contest_data.csv', index=False)
    df.to_json('contest_data.json', orient='records')


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
    driver.get('https://bhuntr.com/competitions')

    crawlContestTitleLink(driver)
 

