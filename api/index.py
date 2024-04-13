from flask import Flask
import random
app = Flask(__name__)


@app.route("/api/python")
def hello_world():
    # 生成一个随机整数
    number = random.randint(1, 100)

    return f"<p>Hello, {number} World!</p>"
