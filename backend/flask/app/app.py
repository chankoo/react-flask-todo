# -*- coding: utf-8 -*-
import os
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from .models import db
from .api import Todos, Users, Auth

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
application = Flask(__name__)
application.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS' : True,
    'SQLALCHEMY_DATABASE_URI' : SQLALCHEMY_DATABASE_URI,
    'SECRET_KEY' : 'chankoo',
})
cors = CORS(application)
api = Api(application)
db.init_app(application)

with application.app_context():
    db.create_all()


api.add_resource(Users, '/users')

api.add_resource(Todos, '/todos')

api.add_resource(Auth, '/login')

if __name__ == '__main__':
    application.run(host='0.0.0.0', port=5000, debug=True)
