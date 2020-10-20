import * as React from 'react';
import { Socket } from "./Socket";

export function MessageForm( {userID} ) {

    console.log("NUMBER IS: ", {userID}.userID)
    let messageReference = React.useRef();
    
    let oauthName = "";
    let oauthimg = "";

    let auth = false;
    React.useEffect(() => {
        Socket.on({userID}.userID, function(data) {
            console.log(data["name"])
            console.log(data["imgurl"])
            oauthName = data["name"]
            oauthimg = data["imgurl"]
            auth = true;
        });
    })

    function addMessage(e) {
        if (auth)
            Socket.emit("message to server", {
                "userID": {userID}.userID,
                "oauthimg": oauthimg,
                "name": oauthName,
                "message": messageReference.current.value,
                "authorized": "y"
            });
        
        
        console.log("THE NUMBER IS: " + {userID}.userID);

        messageReference.current.value = null;
        e.preventDefault();
    }

    return (
        <div className="submit-form">
            <form onSubmit={ addMessage }>
                <input className="input-form" type="text" placeholder="Type in a message..." ref={ messageReference }/>
                <button className="submit-button" type="Submit">Send</button>
            </form>
        </div>
    )
}
