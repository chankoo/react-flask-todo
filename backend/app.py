from flask import Flask
from flask_restful import Api
import os
from flask_cors import CORS
from models import db, Todo

from flask import request
from flask_restful import Resource
from utils import serializer

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' +os.path.join(basedir, 'app.db')
app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS' : True,
    'SQLALCHEMY_DATABASE_URI' : SQLALCHEMY_DATABASE_URI,
})
cors = CORS(app)
api = Api(app)
db.init_app(app)


class TodoList(Resource):
    def post(self):
        r_json = request.get_json()
        new_todo = Todo(**r_json)
        db.session.add(new_todo)
        db.session.commit()
        return serializer([new_todo])

    def _get_todos(self):
        todos = Todo.query.all()
        return todos

    def get(self):
        todos = self._get_todos()
        return serializer(todos)

    def put(self):
        r_json = request.get_json()
        put_todo = Todo.query.filter_by(id=r_json['id']).first()
        if put_todo is None:
            return 'todo id {} does not exist'.format(r_json['id'])
        # 반영 버튼으로 제목과 내용을 수정한 경우
        if 'title' in r_json and 'content' in r_json:
            put_todo.title = r_json['title']
            put_todo.content = r_json['content']
        # TodoItem의 완료 여부만 변경한 경우
        else:
            put_todo.checked = not put_todo.checked
        db.session.commit()
        return 'update successfully'

    def delete(self):
        r_json = request.get_json()
        del_todo = Todo.query.filter_by(id=r_json['id']).first()
        if del_todo is None:
            return 'todo id {} does not exist'.format(r_json['id'])

        db.session.delete(del_todo)
        db.session.commit()
        return 'deleted successfully'

api.add_resource(TodoList, '/')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
