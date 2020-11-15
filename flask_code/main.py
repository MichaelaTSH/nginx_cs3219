from flask import Flask
app = Flask(__name__)@app.route('/')
def hello():
    f = open('index.html','r')
    message = f.read()
    f.close()
    return message
if __name__ == "__main__":
    app.run(host='0.0.0.0')
