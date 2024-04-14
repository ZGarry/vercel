from flask import Flask
import random
app = Flask(__name__)

# python 应该只做数据处理部分，不应该有UI展示部分


@app.route("/api/python")
def hello_world():
    # 生成一个随机整数
    number = random.randint(1, 100)

    return str(number)


@app.route('/')
def home():
    return 'Hello, World!'


@app.route('/about')
def about():
    return 'About'
