from flask import Flask, jsonify
from flask_restful import Api
from flask import request
from database.db_handlers import BaseHandlers

app = Flask(__name__)
api = Api(app)


@app.route('/send_url', methods=['GET'])
def send_url():
    if request.args.get('url'):
        return jsonify({'url': 'Success'})
    return jsonify({'url': 'Failure'})


@app.route('/validate_user', methods=['GET'])
def validate_user():
    user_details = BaseHandlers('/Users/Shared/URL_Fetch.db').get_user(
        username=request.args.get('username')
    )
    if user_details:
        return jsonify({"user_validation": "Success"})
    return jsonify({"user_validation": "Failure"})


# api.add_resource(IsUserExists, '/validate_user/<username>')

if __name__ == '__main__':
    app.run(debug=True)
