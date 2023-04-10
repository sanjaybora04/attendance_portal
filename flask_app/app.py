import flask
from flask import Flask,jsonify
from match_face import match
 
app = Flask(__name__)



@app.route('/comparefaces',methods=['POST'])
def comparefaces():
    img1 = flask.request.files.get('img1')
    img2 = flask.request.files.get('img2')
    m = match(img1,img2)
    return(jsonify({'match':m}))

 
if __name__ == '__main__':
    app.run(port=7000)