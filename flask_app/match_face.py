import cv2
import face_recognition
import numpy as np
import base64

# match faces
def match(img1,img2):
    img1 = img1.split(',')[1]
    img1 = base64.b64decode(img1)
    img1 = np.frombuffer(img1,np.uint8)
    img1 = cv2.imdecode(img1, cv2.IMREAD_COLOR)

    img2 = img2.split(',')[1]
    img2 = base64.b64decode(img2)
    img2 = np.frombuffer(img2,np.uint8)
    img2 = cv2.imdecode(img2, cv2.IMREAD_COLOR)
    try:
        img1 = face_recognition.face_encodings(img1)[0]
        img2 = face_recognition.face_encodings(img2)[0]
        results = face_recognition.compare_faces([img1], img2)
        
        if results[0]:
            return True
        else:
            return False
    except:
        print("error")
        return False