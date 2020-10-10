import os
import flask
import flask_socketio

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")


# GLOBAL 
class ChatBot:
    def __init__(self):
        bot_name = "Poke Bot"
    
    def help(self):
        print("This is the help section!")

poke_bot = ChatBot()

def checkBotMessage(string):
    bot_string = string.split(" ")
    if (bot_string[0] == "!!" and bot_string[1] == "help"):
        poke_bot.help()

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

    checkBotMessage(data["message"])

    print(data["message"])
    socketio.emit("message to client", {
        "name": message_received["name"],
        "message": message_received["message"]
    })

if __name__ == '__main__': 
    socketio.run(
        app,
        debug=True
    )
