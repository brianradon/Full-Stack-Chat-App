import * as React from 'react';
import { Socket } from "./Socket";

export function MessageForm( {userID} ) {

    console.log("NUMBER IS: ", {userID}.userID)
    let messageReference = React.useRef();
    
    let oauthName = "";
    let oauthimg = "";

    // const num = Math.ceil(Math.random() * 100000000);

    const [valid, setValid] = React.useState(false);

    React.useEffect(() => {
        Socket.on({userID}.userID, function(data) {
            console.log(data["name"])
            console.log(data["imgurl"])
            oauthName = data["name"]
            oauthimg = data["imgurl"]
            setValid(true);
        });
    })

    function addMessage(e) {
        if (valid) {
            Socket.emit("message to server", {
                "userID": {userID}.userID,
                "oauthimg": oauthimg,
                "name": oauthName,
                "message": messageReference.current.value,
                "authorized": "y"
            });
        }
        
        console.log("THE NUMBER IS: " + {userID}.userID);

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
