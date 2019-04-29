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


api.add_resource(IsUserExists, '/validate_user/<username>')

if __name__ == '__main__':
    app.run(debug=True)
