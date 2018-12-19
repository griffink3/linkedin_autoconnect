# server.py
from flask import Flask, render_template, request, jsonify, redirect
from linkedin import linkedin
import webbrowser
import requests
import json

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

print("Load Server")

API_KEY = '78po9jcrlm52tz'
API_SECRET = 'FLoVQCbsZ8OQbI2t'
redirect_url = 'http://localhost:5000/authenticated'
application = None
authentication = None
original_url = 'http://localhost:3000/home'
authenticated = False
token = None

get_prof_url = 'https://api.linkedin.com/v2/me'
get_connex_url = 'https://api.linkedin.com/v2/connections?q=viewer&count=50'
my_id = None

@app.route("/")
def index():
    return "index"

@app.route("/api/authenticate", methods=['GET'])
def authenticate():
    permissions = ['r_liteprofile', 'r_emailaddress']
    global authentication
    authentication = linkedin.LinkedInAuthentication(API_KEY, API_SECRET, redirect_url, permissions)
    webbrowser.open(authentication.authorization_url)
    return jsonify(
        response="Authenticating..."
    )

@app.route("/authenticated")
def handleLinkedInRedirection():
    authentication.authorization_code = request.args.get('code')
    global token 
    token = authentication.get_access_token().access_token
    global application
    application = linkedin.LinkedInApplication(token=token)
    global authenticated
    authenticated = True
    return redirect(original_url)

@app.route("/api/check_auth")
def checkAuthenticated():
    auth = "False"
    if authenticated:
        auth = "True"
    return jsonify(
        auth=auth
    )

@app.route("/api/get_token", methods=['GET'])
def get_token():
    return jsonify(
        token=token
    )

@app.route("/api/get_info", methods=['GET'])
def get_info():
    auth = 'Bearer ' + token
    headers = {'Authorization': auth, 'format': 'json'}
    response = requests.get(get_prof_url, headers=headers)
    data = json.loads(response.text)
    global my_id
    my_id = data['id']
    return jsonify(
        firstName=data['firstName']['localized']['en_US'],
        lastName=data['lastName']['localized']['en_US'],
        prof_pic=data['profilePicture']['displayImage']
    )

@app.route("/api/get_connections", methods=['GET'])
def get_connections():
    print("Getting connection")
    auth = 'Bearer ' + token
    headers = {'Authorization': auth, 'format': 'json'}
    response = requests.get(get_prof_url, headers=headers)
    data = json.loads(response.text)
    global my_id
    my_id = data['id']
    return jsonify(
        firstName=data['firstName']['localized']['en_US'],
        lastName=data['lastName']['localized']['en_US'],
        prof_pic=data['profilePicture']['displayImage']
    )

if __name__ == "__main__":
    app.run()