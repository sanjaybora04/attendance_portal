# Attendance Portal

## How to install :-

* Clone the repository
  ```
  git clone https://github.com/sanjaybora04/attendance_portal
  ```
* run this command `inside` client and server folder
  > You should have already installed `npm` in your system
  ```
  npm i
  ```
  
* run this command `inside` flask_app.py
  > You should have already installed `python` and `pip` in your system
  ```
  pip install -r 'requirements.txt'
  ```

* ### Configuration :-

* Set your email and password to send otps
  * Go to `server/config/keys` and set your outlook mail id and password.
  > If you want to use email service other than outlook then configure transporter in `server/routes/root/routes`  

* Set your server baseurl in `client/src/api`

## How to use :-

* Run this command inside client folder to start the react app
  ```
  npm run dev -- --host
  ```
* Run this command inside server folder to start the node server
  ```
  node index.js
  ```
* Run this command inside flask_app to start the flask app
  ```
  python app.py
  ```
