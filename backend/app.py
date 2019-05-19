import os
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from models import db
from api import Todos, Users, Auth #, Join, token_required

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS' : True,
    'SQLALCHEMY_DATABASE_URI' : SQLALCHEMY_DATABASE_URI,
    'SECRET_KEY' : 'chankoo',
})
cors = CORS(app)
api = Api(app)
db.init_app(app)

api.add_resource(Users,
                 '/users/')
                 # , '/users/<string:id>'
                 # , '/users/join'
                 # )

# user_view = Users.as_view('users')
# app.add_url_rule('/users/', view_func=user_view, methods=['GET', 'POST'])
# app.add_url_rule('/users/', view_func=user_view, methods=['',])
# app.add_url_rule('/users/', view_func=user_view, methods=['GET',])


# api.add_resource(Todos
#                  , '/todos'
#                  , '/todos/<string:public_id>'
#                  )
api.add_resource(Todos,'/')

api.add_resource(Auth, '/login/')
# api.add_resource(Join, '/join')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
