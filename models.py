# models.py
import flask_sqlalchemy
from app import db


class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(16))
    message = db.Column(db.String(255))
    
    def __init__(self, m):
        # self.username = u
        self.message = m
        
    def __repr__(self):
        return '<Usps address: %s>' % self.message

