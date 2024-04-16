from sentence_transformers import SentenceTransformer, util
import pandas as pd
import jieba
import torch
import torch.nn.functional as F

# Initialize jieba tokenizer
jieba.initialize()

def tokenize_chinese(text):
    return ' '.join(jieba.cut(text))

def add_categories(data, category_embeddings, model):
    def classify_contest(row):
        title = tokenize_chinese(row['title']) if 'title' in row and pd.notna(row['title']) else ""
        detail = tokenize_chinese(row['detail']) if 'detail' in row and pd.notna(row['detail']) else ""

        title_embedding = model.encode(title, convert_to_tensor=True) if title else None
        detail_embedding = model.encode(detail, convert_to_tensor=True) if detail else None

        if title_embedding is not None and title_embedding.nelement() != 0:
            title_embedding = F.normalize(title_embedding, p=2, dim=0)
        if detail_embedding is not None and detail_embedding.nelement() != 0:
            detail_embedding = F.normalize(detail_embedding, p=2, dim=0)

        category_scores = {category: 0 for category in categories}

        for category, embeddings in category_embeddings.items():
            if title_embedding is not None and detail_embedding is not None:
                title_similarity = (util.cos_sim(title_embedding, embeddings)**2).mean().item()
                
                detail_similarity = (util.cos_sim(detail_embedding, embeddings)**2).mean().item()
                print(category, title, title_similarity, detail_similarity)
                category_scores[category] = (title_similarity*0.5 + detail_similarity*0.5)
            elif title_embedding is not None:
                title_similarity = (util.cos_sim(title_embedding, embeddings)**2).mean().item()
                category_scores[category] = title_similarity
            elif detail_embedding is not None:
                detail_similarity = (util.cos_sim(detail_embedding, embeddings)**2).mean().item()
                category_scores[category] = detail_similarity

        return max(category_scores, key=category_scores.get)

    data['category'] = data.apply(lambda row: classify_contest(row), axis=1)
    return data

# Load the model
model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')

# Define categories and keywords
categories = {
    "程式比賽": ["算法", "編碼", "黑客", "軟件", "除錯", "程式語言", "開發", "資料結構", "演算法", "安全性"],
    "文學創作": ["詩歌", "小說", "散文", "出版", "寫作", "自傳"],
    "文學獎": ["文學", "詩歌", "小說", "散文", "批評", "文藝", "理論", "評論"],
    "平面設計": ["視覺", "版面", "商業設計", "宣傳", "品牌", "圖形設計", "印刷", "排版", "廣告設計", "視覺藝術"],
    "產品設計": ["工業設計", "原型", "使用者體驗", "功能", "包裝", "產品開發", "設計思維", "材料科學", "人機互動", "消費者需求"],
    "多媒體製作": ["剪輯", "動畫", "音效", "視頻", "3D", "多媒體設計", "影片製作", "音樂製作", "後期製作", "數位藝術"],
    "攝影比賽": ["數碼攝影", "肖像", "風景", "野生", "展覽", "攝影藝術", "黑白攝影", "攝影技巧", "攝影師", "視覺敘事"],
    "歌唱比賽": ["聲樂", "音樂創作", "現場", "競唱", "音樂會", "演唱技巧", "聲樂訓練", "音樂表演", "歌劇", "流行音樂"],
    "舞蹈比賽": ["現代舞", "芭蕾", "街舞", "民族舞", "舞蹈展覽", "舞蹈表演", "舞蹈技巧", "編舞", "舞蹈團", "舞蹈歷史"],
    "演講與辯論": ["演說", "辯論", "故事", "技巧", "說服", "公共演講", "溝通技巧", "演講者", "語言藝術", "說理"],
    "詞曲創作": ["作詞", "作曲", "編曲", "音樂製作", "音樂理論", "音樂創意", "音樂編輯", "樂譜", "音樂創新", "旋律"],
    "電競賽事": ["線上", "競技", "電子競技", "團隊", "直播", "遊戲", "比賽", "電競市場", "電競運動員", "電競賽制"],
    "棋牌競賽": ["象棋", "圍棋", "撲克", "橋牌", "棋類競賽", "策略遊戲", "智力遊戲", "國際棋盤", "賽事組織", "遊戲規則"],
    "創新創業企劃賽": ["創業計劃", "市場策略", "初創企業", "投資", "商業模式", "創新管理", "商業發展", "技術創新", "企業精神", "市場進入"],
    "投資競賽": ["股票", "財務規劃", "策略", "預測", "經濟", "投資組合", "市場分析", "資本市場", "經濟學", "金融工具"],
    "創新發明競賽": ["創新", "專利", "科學研究", "工程", "技術", "發明展示", "科技發展", "研究成果", "實驗設計", "產品原型"],
    "烹飪": ["美食", "烹飪技術", "廚藝比賽", "食藝", "展示", "食品準備", "烹飪藝術", "食品安全", "飲食文化", "廚房管理"],
    "體育": ["運動", "球類", "訓練", "體育", "競技", "健身", "鐵人"],
    "選秀": ["才藝", "實境秀", "節目", "藝人", "表演", "娛樂"],
    "其他": ["特殊", "未分類", "多樣性", "新奇", "非常規", "異常事件", "罕見", "新創事物", "非傳統", "未知"]
}

# Precompute category embeddings
category_embeddings = {
    cat: model.encode(' '.join(keywords), convert_to_tensor=True)
    for cat, keywords in categories.items()
}

# Load data
df = pd.read_csv("contest_detail.csv")

# Process data
df_processed = add_categories(df, category_embeddings, model)

# Output the results
output_path = "./processed_contests.csv"
df_processed[['title', 'category']].to_csv(output_path, sep='\t', index=False)
print("Categories added and data saved to", output_path)

