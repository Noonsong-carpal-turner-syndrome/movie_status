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

import string
import random

etc = []    # 기타: 0
ent = ['youtube']    # 엔터테인먼트: 1
prod = ['bank']   # 생산성 및 금융: 2
sns = ['blog', 'news', 'tistory'] # 소셜: 3
shop = ['shopping', 'store']    # 쇼핑 및 음식: 4
doc = ['document', 'docs', 'pdf']  # 정보 및 문서: 5
edu = ['exam']    # 학습: 6
car = ['career']  # 사무or경력: 7

def labeling(file):#기사 내용 중 단어 선별하기
    f = pd.read_csv(file,'r', encoding = 'UTF-8-sig')
    for line in rdr:
        print(line)
        key1 = 0
        lines = []
        for word in text:
            lines = str.split(text,".")
        for each_line in lines:
            result = []
            if each_line.find("기부") > 0:
                result = random.sample(virtue, number)
                key1 = "기부"
                break
            elif each_line.find("선행") > 0:
                result = random.sample(virtue, number)
                key1 = "선행"
                break
            else:
                break
    f.close()
    return key1, result