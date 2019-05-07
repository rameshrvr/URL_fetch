from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

VALID_USERS = ['rvramesh', 'rameshrv']


class IsUserExists(Resource):
    def get(self, username):
        if username in VALID_USERS:
            return {"user_validation": "Success"}
        return {"user_validation": "Failure"}


class GetUrlFromUser(Resource):
    def get(self, url):
        if url:
            return {"url_get": "Success"}
        return {"url_get": "Failure"}


api.add_resource(IsUserExists, '/validate_user/<username>')
api.add_resource(GetUrlFromUser, '/get_url/<url>')

if __name__ == '__main__':
    app.run(debug=True)
