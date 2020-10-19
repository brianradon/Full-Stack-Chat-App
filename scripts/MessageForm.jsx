import * as React from 'react';
import { Socket } from "./Socket";

export function MessageForm() {

    let messageReference = React.useRef();
    
    let oauthName = "";
    let oauthimg = "";

    React.useEffect(() => {
        Socket.on("oauth to user", function(data) {
            console.log(data["name"])
            console.log(data["imgurl"])
            oauthName = data["name"]
            oauthimg = data["imgurl"]
        });
    })
    
    function addMessage(e) {
        Socket.emit("message to server", {
            "oauthimg": oauthimg,
            "name": oauthName,
            "message": messageReference.current.value,
            "authorized": "y"
        });
        
        messageReference.current.value = null;
        e.preventDefault();
    }

    return (
        <div className="submit-form">
            <form onSubmit={ addMessage }>
                <input type="text" placeholder="Type in a message..." ref={ messageReference }/>
                <button type="Submit">Send</button>
            </form>
        </div>
    )
}
