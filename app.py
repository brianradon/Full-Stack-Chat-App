from os.path import join, dirname
from dotenv import load_dotenv
import os
import flask
import flask_sqlalchemy
import flask_socketio
import models
import time

MESSAGES_RECEIVED_CHANNEL = "all messages received"

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)

# DATABASE
sql_user = os.environ['SQL_USER']
sql_pwd = os.environ['SQL_PASSWORD']
dbuser = os.environ['USER']

database_uri = 'postgresql://{}:{}@localhost/postgres'.format(
    sql_user, sql_pwd)

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app

db.create_all()
db.session.commit()

def emit_all_messages(channel):
    all_messages = [db_chat.message for db_chat in db.session.query(models.Chat).all()]

    socketio.emit(channel, {
        "all_messages": all_messages
    })

# GLOBAL 
class ChatBot:
    def __init__(self):
        self.bot_name = "Poke Bot"
    
    # todo implement github

    # todo impement poke-api

    def about(self):
        print("This is the about section!")
        socketio.emit("message to client",
        {
            "name": self.bot_name,
            "message": """Hello there!  I am Poke Bot.  Try typing '!! help' for a list of 
            functionality! """
        })
        bot_message = """Hello there!  I am Poke Bot.  Try typing '!! help' for a list of 
            functionality! """
        db.session.add(models.Chat(bot_message))
        db.session.commit();
        
        emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

    def help(self):
        print("This is the help section!")
        socketio.emit("message to client",
        {
            "name": self.bot_name,
            "message": """Looking for help?  Try some of these commands:
                \n!! about\n!! funtranslate <message>\n"""
        })

    def noCommandFound(self, command):
        socketio.emit("message to client",
        {
            "name": self.bot_name,
            "message": "'!! {}' is not a command".format(command)
        })

poke_bot = ChatBot()
commands = ["help", "about", "funtranslate"]

def checkBotMessage(string):
    bot_string = string.split(" ")
    if (bot_string[0] == "!!" and bot_string[1] == "help"):
        poke_bot.help()
    elif (bot_string[0] == "!!" and bot_string[1] == "about"):
        poke_bot.about()
    elif (bot_string[0] == "!!" and bot_string[1] not in commands):
        poke_bot.noCommandFound(bot_string[1])

# SOCKET
@app.route('/')
def hello():
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print('Someone connected!')
    socketio.emit('connected', {
        'test': 'Connected'
    })

    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

@socketio.on('disconnect')
def on_disconnect():
    print ('Someone disconnected!')

@socketio.on("message to server")
def message_to_client(data):
    print("Received a message.")
    message_received = {
        "name": data["name"],
        "message": data["message"]
    }

    db.session.add(models.Chat(data["message"]))
    db.session.commit();

    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

    print(data["message"])
    print("Sending message")
    socketio.emit("message to client", {
        "name": message_received["name"],
        "message": message_received["message"]
    })
    print("Message sent")
    checkBotMessage(data["message"])

if __name__ == '__main__': 
    socketio.run(
        app,
        debug=True
    )
