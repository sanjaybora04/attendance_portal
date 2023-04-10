import flask
from flask import Flask,jsonify
from match_face import match
 
app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # Set request payload limit to 10mb


@app.route('/comparefaces',methods=['POST'])
def comparefaces():
    jsondata = flask.request.get_json()
    m = match(jsondata['img1'],jsondata['img2'])
    return(jsonify({'match':m}))

 
if __name__ == '__main__':
    app.run(port=7000)