'''<labels>
엔터테인먼트: ent
생산성 및 금융: prod
소셜: sns
쇼핑 및 음식: shop
정보 및 문서: doc
학습: edu
사무or경력: car
기타: etc'''

import pandas as pd

def labeling(file):#기사 내용 중 단어 선별하기
    etc = ['search']    # 기타: 0
    ent = ['youtube', 'webtoon']    # 엔터테인먼트: 1
    prod = ['bank']   # 생산성 및 금융: 2
    sns = ['blog', 'news', 'facebook', 'instagram', 'twitter', 'tistory'] # 소셜: 3
    shop = ['shopping', 'store']    # 쇼핑 및 음식: 4
    doc = ['document', 'docs', 'pdf']  # 정보 및 문서: 5
    edu = ['exam']    # 학습: 6
    car = ['career']  # 사무or경력: 7
    f = pd.read_csv(file,'r', encoding = 'UTF-8-sig')
    f.columns = ['url', 'title', 'timestamp','label']
    if f['url'].str.contains(word in ent):
        f['label'] = 1
    elif f['url'].str.contains(word in prod):
        f['label'] = 2
    elif f['url'].str.contains(word in sns):
        f['label'] = 3
    elif f['url'].str.contains(word in shop):
        f['label'] = 4
    elif f['url'].str.contains(word in doc):
        f['label'] = 5
    elif f['url'].str.contains(word in edu):
        f['label'] = 6
    elif f['url'].str.contains(word in car):
        f['label'] = 7
    elif f['url'].str.contains(word in etc):
        f['label'] = 0