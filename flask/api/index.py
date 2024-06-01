from flask import Flask, request
import random
import akshare as ak
from flask_cors import CORS
app = Flask(__name__)
app.json.ensure_ascii = False # 解决中文乱码问题
CORS(app)

# python 应该只做数据处理部分，不应该有UI展示部分


@app.route("/api/python")
def hello_world():
    # 生成一个随机整数
    number = random.randint(1, 100)

    return str(number)


@app.route("/api/dapan/all_pe")
def all_pe():
    # 生成一个随机整数
    df = ak.stock_sse_summary()
    # 提取主板的市盈率
    main_board_pe = df.loc[df['项目'] == '平均市盈率', '主板'].values[0]
    # 提取科创板的市盈率
    kcb_pe = df.loc[df['项目'] == '平均市盈率', '科创板'].values[0]
    m = {'main_board_pe': main_board_pe, 'kcb_pe': kcb_pe}
    # 会被当做字符串传递
    return m


@app.route("/api/all_stock")
def all_stock():
    stock_zh_a_spot_em_df = ak.stock_zh_a_spot_em()
    selected_columns = ['代码', '名称', '市盈率-动态', '市净率']
    selected_df = stock_zh_a_spot_em_df[selected_columns]

    # 删除包含 NaN 的行
    selected_df.dropna(inplace=True)

    # 转换为 JSON 格式的列表
    json_list = selected_df.to_dict(orient='records')

    print(json_list)
    return json_list

@app.route("/api/pe")
def api_pe():
    symbol = request.args.get('stock')  # 获取传入的symbol参数
    stock_a_indicator_lg_df = ak.stock_a_indicator_lg(symbol=symbol)
    # 删除包含 NaN 的行
    stock_a_indicator_lg_df.dropna(inplace=True)
    data = [
        {'date': str(row['trade_date']), 'value': row['pe']}
        for index, row in stock_a_indicator_lg_df.iterrows()
    ]

    return data



@app.route('/')
def home():
    return 'Hello, World!'


@app.route('/about')
def about():
    return 'About'
