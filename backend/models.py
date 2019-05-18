from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()


class Todo(db.Model):
    __tablename__ = 'todo'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300))
    content = db.Column(db.Text)
    has_deadLine = db.Column(db.Boolean())
    deadLine = db.Column(db.Date)
    checked = db.Column(db.Boolean())
    rank = db.Column(db.Integer)

    def __init__(self, title, content, has_deadLine=False, deadLine=None, checked=False, rank=None):
        self.title = title
        self.content = content
        self.has_deadLine = has_deadLine
        self.deadLine = deadLine
        self.checked = checked
        self.rank = rank

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
            'rank': self.rank
        })