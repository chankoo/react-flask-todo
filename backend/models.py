from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()


class Todo(db.Model):
    __tablename__ = 'todo'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300))
    content =db.Column(db.Text)
    dead_line = db.Column(db.Date)
    checked = db.Column(db.Boolean())
    rank = db.Column(db.Integer)

    def __init__(self, title, content, dead_line=None, checked=False, rank=None):
        self.title = title
        self.content = content
        self.dead_line = dead_line
        self.checked = checked
        self.rank = rank

    def __str__(self):
        return "<Todo(id={}, title={})>".format(self.id, self.title)

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'dead_line': self.dead_line,
            'checked': self.checked,
            'rank': self.rank
        })