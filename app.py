import os
import flask
import flask_socketio
import time

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")


# GLOBAL 
class ChatBot:
    def __init__(self):
        self.bot_name = "Poke Bot"
    
    def about(self):
        print("This is the about section!")
        socketio.emit("message to client",
        {
            "name": self.bot_name,
            "message": """Hello there!  I am Poke Bot.  Try typing '!! help' for a list of 
            functionality! """
        })

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
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print('Someone connected!')
    socketio.emit('connected', {
        'test': 'Connected'
    })

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
