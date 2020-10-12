from os.path import join, dirname
from dotenv import load_dotenv
import os
import flask
import flask_sqlalchemy
import flask_socketio
import time
import requests

# test comment

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

class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16))
    message = db.Column(db.String(500))

    def __init__(self, u, m):
        self.username = u
        self.message = m
        
    def __repr__(self):
        return '<Usps address: %s>' % self.message

db.create_all()
db.session.commit()

def emit_all_messages(channel):
    all_users = [db_chat.username for db_chat in db.session.query(Chat).all()]
    all_messages = [db_chat.message for db_chat in db.session.query(Chat).all()]

    socketio.emit(channel, {
        "all_users": all_users,
        "all_messages": all_messages
    })

# GLOBAL 
def checkBotMessage(string):
    bot_string = string.split(" ")
    print("BOT STRING: " + string)
    if (bot_string[0] == "!!" and bot_string[1].lower() == "help"):
        poke_bot.help()
    elif (bot_string[0] == "!!" and bot_string[1].lower() == "about"):
        poke_bot.about()
    elif (bot_string[0] == "!!" and bot_string[1].lower() == "github"):
        poke_bot.github()
    elif (bot_string[0] == "!!" and bot_string[1].lower() == "pokedex" and bot_string[2]):
        poke_bot.pokeDex(bot_string[2])
    elif (bot_string[0] == "!!" and bot_string[1].lower() not in commands):
        poke_bot.noCommandFound(bot_string[1])

class ChatBot:
    def __init__(self):
        self.bot_name = "Poke Bot"
    
    def about(self):
        print("This is the about section!")

        bot_message = """Hello there!  I am Poke Bot.  Try typing '!! help' for a list of 
            functionality! """
        db.session.add(Chat(self.bot_name, bot_message))
        db.session.commit();
        
        emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

    def github(self):
        print("This is the about section!")

        bot_message = """Checkout the source code at: https://github.com/NJIT-CS490/project2-br96"""
        db.session.add(Chat(self.bot_name, bot_message))
        db.session.commit();
        
        emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

    def help(self):
        print("This is the help section!")
        
        bot_message = """Looking for help?  Try some of these commands:
                <br>!! about<br>!! funtranslate <em>message</em><br>!! github<br>!! pokedex <em>pokemon</em>"""

        db.session.add(Chat(self.bot_name, bot_message))
        db.session.commit();

        emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

    def noCommandFound(self, command):
        socketio.emit("message to client",
        {
            "name": self.bot_name,
            "message": "'!! {}' is not a command".format(command)
        })

    def pokeDex(self, pokemon):
        selected_pokemon = pokemon
        if (selected_pokemon == ""):
            selected_pokemon = "bulbasaur"

        pokedex = requests.get("https://pokeapi.co/api/v2/pokemon/{}".format(selected_pokemon.lower()))

        if (pokedex.status_code == 404):
            bot_message = """That's not a pokemon!  Try again!"""

            db.session.add(Chat(self.bot_name, bot_message))
            db.session.commit();

            emit_all_messages(MESSAGES_RECEIVED_CHANNEL)
        else:
            poke_name = pokedex.json()["name"].upper()
            poke_id = pokedex.json()["id"]
            poke_height = self.addDecimal(str(pokedex.json()["height"]))
            poke_weight = self.addDecimal(str(pokedex.json()["weight"]))
            types = []

            for type in pokedex.json()["types"]:
                types.append((type["type"]["name"]).upper())

            typeString = self.convertTypestoString(types)

            bot_message = self.convertToHtML(poke_name, poke_id, poke_height, poke_weight, typeString)

            db.session.add(Chat(self.bot_name, bot_message))
            db.session.commit();

            emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

    def addDecimal(self, number):
        num_string = str(number)
        if (len(num_string) == 1):
            return "0.{}".format(num_string)
        else:
            return "{}.{}".format(num_string[:-1], num_string[-1])

    def convertTypestoString(self, arr):
        if len(arr) == 1:
            return str(arr[0])
        else:
            return "{} / {}".format(arr[0], arr[1])

    def convertToHtML(self, name, pokeid, height, weight, types):
        return """<div className='pokemon-container'>
                    <h1 className='poke-name'>NAME: {}</h1>
                    <p className='poke-id'>ID: {}</p>
                    <p className='poke-height'>HEIGHT: {} m</p>
                    <p className='poke-weight'>WEIGHT: {} kg</p>
                    <p className='poke-types'>TYPE: {}</p>
                </div>""".format(name, pokeid, height, weight, types)

poke_bot = ChatBot()
commands = ["help", "about", "funtranslate", "pokedex"]

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

    db.session.add(Chat(data["name"], data["message"]))
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
