import * as React from 'react';
import { Socket } from "./Socket";

export default function Message({ username, userMessage }) {

    const [message, setMessage] = React.useState({
        name: "",
        message: ""
    });

    React.useEffect(() => {
        Socket.on("message to client", (data)=> {
            console.log("Received a message: " + data["name"] + ": " + data["message"]);
            setMessage(data["name"], data["message"]);
        })
    })
    return (
        <div className="user-message">
            <div className="user-name">{ username }</div>
            <div className="user-message">{ userMessage }</div>
        </div>
    )
}
