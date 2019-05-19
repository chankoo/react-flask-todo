from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
import json

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    # public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))
    # admin = db.Column(db.Boolean)

    def __init__(self
                 # , public_id
                 , name, password):
                 # , admin=False):

        # self.public_id = public_id
        self.name = name
        self.password = password
        # self.admin = admin

    def serialize(self):
        return json.dumps({
            'id': self.id,
            # 'public_id': self.public_id,
            'name': self.name,
            'password': self.password,
        })


class Todo(db.Model):
    __tablename__ = 'todo'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300))
    content = db.Column(db.Text)
    has_deadLine = db.Column(db.Boolean())
    deadLine = db.Column(db.Date)
    checked = db.Column(db.Boolean())
    priority = db.Column(db.Integer, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    user = relationship('User', backref=backref('todo', order_by=id))


    def __init__(self, title, content, has_deadLine=False, deadLine=None, checked=False, priority=None):
        self.title = title
        self.content = content
        self.has_deadLine = has_deadLine
        self.deadLine = deadLine
        self.checked = checked
        self.priority = priority

    def __str__(self):
        return "<Todo(title={},content={})>".format(self.title, self.content)

    def set_deadLine(self, deadLine):
        self.deadLine = deadLine
        return

    def get_deadLine(self):
        return self.deadLine

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'has_deadLine': self.has_deadLine,
            'deadLine': str(self.deadLine),
            'checked': self.checked,
            'priority': self.priority
        })


# class TodoList(db.Model):
#     __tablename__ = 'todo_list'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#
#     user = relationship('User', backref=backref('todo_list', order_by=id))
#
#     def __init__(self, user_id):
#         self.user_id = user_id
#
#     def serialize(self):
#         return json.dumps({
#             'id': self.id,
#             'user_id': self.user_id,
#         })
