from flask import request, make_response
from flask_restful import Resource
from .models import db, Todo, User
from .utils import serializer
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import json
from functools import wraps


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # request header에 토큰이 있으면 진행
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']

        if not token:
            print('if not token')
            return make_response('{"msg":"Token is missing"}', 401)

        try:
            data = jwt.decode(token, 'chankoo')  # decoded with secret key
        except:
            return make_response('{"msg":"Token is invalid"}', 401)

        return f(*args, **kwargs)  # user 오브젝트를 route에 넘겨주기위해 return

    return decorated


class Users(Resource):
    method_decorators = {
        'get': [token_required],
        'delete': [token_required],
        }

    def _get_user(self):
        users = User.query.all()
        return users

    def get(self, user_id):
        print(request.get_json())
        users = self._get_user()
        data = request.get_json()

        if user_id is not None:
            # return a single user
            if 'public_id' in data:
                for user in users:
                    if user.public_id == data['public_id']:
                        return serializer([user])

        # return all users
        return serializer(users)

    def post(self):
        data = request.get_json()
        print(data)
        hashed_pwd = generate_password_hash(data['password'], method='sha256')
        new_user = User(name=data['name'], password=hashed_pwd)

        db.session.add(new_user)
        db.session.commit()
        return serializer([new_user])

    def delete(self):
        data = request.get_json()
        print(data)
        del_user = User.query.filter_by(public_id=data['public_id']).first()
        if del_user is None:
            return 'user public_id {} does not exist'.format(data['public_id'])

        db.session.delete(del_user)
        db.session.commit()
        return 'deleted successfully'


class Todos(Resource):
    method_decorators = dict.fromkeys(['get', 'post', 'put', 'delete'], [token_required])

    MAX_PRIORITY = 987654321
    MIN_PRIORITY = 0

    def _set_priority(self):
        todos = Todo.query.all()
        is_set_priority = True
        for todo in todos:
            if todo.priority is None:
                is_set_priority = False
                todo.priority = todo.id
        if is_set_priority:
            return
        db.session.commit()
        return

    def _get_todos(self):
        self._set_priority()
        return Todo.query.all()

    def get(self):
        todos = self._get_todos()
        return serializer(todos)

    def post(self):
        data = request.get_json()
        print(data)
        new_todo = Todo(**data)
        if data['has_deadLine']:
            new_todo.set_deadLine(datetime.datetime.strptime(new_todo.get_deadLine()[:10], '%Y-%m-%d'))
        db.session.add(new_todo)
        db.session.commit()
        self._set_priority()
        return serializer([new_todo])

    def put(self):
        data = request.get_json()
        put_todo = Todo.query.filter_by(id=data['id']).first()
        # 수정할 아이템이 없는 경우
        if put_todo is None:
            return 'todo id {} does not exist'.format(data['id'])

        # 반영 버튼으로 제목과 내용 (혹은 마감기한)을 수정한 경우
        if 'title' in data and 'content' in data:
            print(data)
            put_todo.title = data['title']
            put_todo.content = data['content']
            if data['has_deadLine']:
                put_todo.set_deadLine(datetime.datetime.strptime(data['deadLine'][:10], '%Y-%m-%d'))
            else:
                put_todo.set_deadLine(None)

        # TodoItem의 완료 여부만 변경한 경우
        elif 'checked' in data:
            print(data)
            put_todo.checked = not put_todo.checked

        # priority 가 바뀐 경우
        elif 'dir' in data:
            todos = Todo.query.all()
            find_todo_id = None

            # 현재 put_todo 다음으로 작은 우선순위인 todo찾기
            if data['dir'] == 'up':
                find_todo_priority = Todos.MIN_PRIORITY
                for todo in todos:
                    if (todo.priority < put_todo.priority) and (todo.priority > find_todo_priority):
                        find_todo_id = todo.id
                        find_todo_priority = todo.priority

            # 현재 put_todo 다음으로 큰 우선순위인 todo찾기
            else:
                find_todo_priority = Todos.MAX_PRIORITY
                for todo in todos:
                    if (todo.priority > put_todo.priority) and (todo.priority < find_todo_priority):
                        find_todo_id = todo.id
                        find_todo_priority = todo.priority

            # 찾은 todo와 우선순위값 교환
            temp_priority = put_todo.priority
            put_todo.priority = find_todo_priority
            try:
                Todo.query.filter_by(id=find_todo_id).first().priority = temp_priority

                db.session.commit()
            except:
                pass
            return self.get()

        db.session.commit()
        return serializer([put_todo])

    def delete(self):
        data = request.get_json()
        del_todo = Todo.query.filter_by(id=data['id']).first()
        if del_todo is None:
            return 'todo id {} does not exist'.format(data['id'])

        db.session.delete(del_todo)
        db.session.commit()
        return 'deleted successfully'


class Auth(Resource):
    def post(self):
        """
            post login info(user name, password)
            return authentication token
        """

        data = request.get_json()
        print(data)

        user = User.query.filter_by(name=data['name']).first()
        if not user:
            return make_response('Could not verify', 401)

        if check_password_hash(user.password, data['password']):
            token = jwt.encode({
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)  # 30 minutes to expire
                }
                , 'chankoo'
            )

            return json.dumps({
                'token': token.decode('UTF-8'),
                'name': user.name
                               })

        return make_response('Could not verify', 401)


