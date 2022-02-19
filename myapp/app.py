import os
import socket
from flask import Flask,request,jsonify
from influxdb import InfluxDBClient

app = Flask(__name__)

@app.route("/")
def main():
    return "Python is fun!\n"

@app.route('/about')
def about():
    return 'I am '+socket.gethostname()

#https://www.influxdata.com/blog/getting-started-python-influxdb/
@app.route('/db')
def db():
    client = InfluxDBClient(host='influxdb')
    resp = client.get_list_database()
    client.switch_database('k6')
    return jsonify(resp),200

@app.route('/users')
def get_users():
    json_data = [{"name":"alice","age":18},{"name":"bob", "age": 22}]
    return jsonify(json_data),200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=True)   