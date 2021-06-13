import flask
from konlpy.tag import Okt  # tokenizing(url, title)
import nltk # vectorizing(X_token)
from nltk import sent_tokenize, word_tokenize
from nltk.stem import LancasterStemmer
from nltk.corpus import stopwords
import re
import tensorflow
from tensorflow import keras
from konlpy.tag import Okt
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model

'''불용어 제거 및 토큰화'''

def tokenizing(url,title):
    kr_norm = []
    eng_norm = []
    try:
        kr_tokens = re.sub(r"[^ㄱ-ㅎㅏ-ㅣ가-힣]+", " ", title.lower())
        eng_tokens = re.sub("[^A-Za-z]+", " ", title.lower()) + re.sub("[^A-Za-z]+", " ", url.lower())
    except Exception as e: pass
    kr_norm.append(kr_tokens)
    eng_norm.append(eng_tokens)
    kr_stopwords=['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다']
    eng_stopwords=['https','http','www','com','co','kr','org','ac'] #불용어 제거하기
    
    okt = Okt()
    X_token=[]
    for sentence in kr_norm:
        temp_X = []
        temp_X = okt.morphs(sentence, stem=True) # 토큰화
        temp_X = [word for word in temp_X if not word in kr_stopwords] # 불용어 제거
        X_token.append(temp_X)

    ps=LancasterStemmer()
    stop_words = set(stopwords.words('english'))
    stemData=[]
    for sentence in eng_norm:
        tokenData = nltk.word_tokenize(sentence)
        tempData = []
        for word in tokenData:  # 불용어 제거
            if word not in stop_words and word not in eng_stopwords:
                word = ps.stem(word)
                if len(word)>1:
                    tempData.append(word)
        stemData.append(tempData)
    temp = []
    for n,m in zip(X_token,stemData):
        temp.append(n+m)
    X_token = temp
    return X_token

'''정수 인코딩 수행'''

def vectorizing(X_token):
    max_words = 35000
    tokenizer = Tokenizer(num_words = max_words) # 상위 35,000개의 단어만 보존
    tokenizer.fit_on_texts(X_token) 
    X_token = tokenizer.texts_to_sequences(X_token)
    word_to_index = tokenizer.word_index
    max_len = max(len(l) for l in X_token)
    X_data = pad_sequences(X_token, maxlen=max_len)
    return X_data

def predicting(X_data):
    model = load_model('E:\study\screentime_chrome\mongo-backend\src\main\python\model1.h5')
    predict = model.predict_classes(X_data)
    # 기존 X_data, y_data json 파일에 X_data, predict 추가하기=> training(url)에 필요
    return predict[0]
    
from pymongo import MongoClient
from collections import Counter

'''url과 같은 domain의 최빈 label 리턴'''

def classifying(url, X_data):
    # mongodb에서 같은 domain인 url들 검색해서 label 갖고오기 > 최빈값
    domain = url.split('/')[2]
    conn = MongoClient('mongodb+srv://youngbeen:sm1613362@chrome-screentime.vmdiu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    db = conn.chrome_screentime
    collection = db.urls
    documents = collection.find({"domain":domain})  # ,{"_id":False,"url":False,"label":True,"domain":False}
    conn.close()
    
    labels =[]
    for doc in documents:
        labels.append(doc['label'])
    labels.append(str(predicting(X_data)))
    print(labels)
    cnt = Counter(labels)
    print(cnt)
    result = cnt.most_common(1)[0][0]

    return result

from flask import Flask, request
from flask_restx import Api, Resource

app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
api = Api(app)  # Flask 객체에 Api 객체 등록

@api.route('/classify',methods=['POST'])
class Classifier(Resource):
    def post(self):
        print("post")
        res = flask.Response()
        data = request.get_json()
        url = str(data['url'])
        title = str(data['title'])
        domain = url.split('/')[2]
        X_token = tokenizing(url,title)
        X_data = vectorizing(X_token)

        '''predicted_url = {
            "url" : url,
            "domain" : domain,
            "label" : predicting(X_data)
        }
        conn = MongoClient('mongodb+srv://youngbeen:sm1613362@chrome-screentime.vmdiu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        db = conn.chrome_sreentime
        collection = db.urls
        documents = collection.insert(predicted_url)
        conn.close()'''

        label = classifying(url, X_data)
        res.headers["Access-Control-Allow-Origin"] = "*"
        res.set_data(label)
        return res # label 보내주기

if __name__ == '__main__':
    app.run(debug = True, host="127.0.0.1", port=5000)