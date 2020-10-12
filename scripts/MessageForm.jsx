import * as React from 'react';
import { Socket } from "./Socket";

export function MessageForm() {

    let nameReference = React.useRef();
    let messageReference = React.useRef();

    function addMessage(e) {

        Socket.emit("message to server", {
            "name": nameReference.current.value,
            "message": messageReference.current.value
        });

        // console.log(nameReference.current.value + ": " + messageReference.current.value);
        messageReference.current.value = null;
        e.preventDefault();
    }

    return (
        <div className="submit-form">
            <form onSubmit={ addMessage }>
                <input type="text" placeholder="Username" ref={ nameReference }/>
                <input type="text" placeholder="Type in a message..." ref={ messageReference }/>
                <button type="Submit">Send</button>
            </form>
        </div>
    )
}
