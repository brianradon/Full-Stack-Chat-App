import * as React from 'react';
import { Socket } from "./Socket";

export default function ChatHistory() {

    const [messages, setMessages] = React.useState([
        {
            name: "Brian",
            message: "Hello World"
        },
        {
            name: "Thomas",
            message: "Hello World"
        }
    ]);

    React.useEffect(() => {
        Socket.on("message to client", (data)=> {
            console.log("Received a message: " + data["name"] + ": " + data["message"]);
            setMessages([...messages, {
                name: data["name"],
                message: data["message"]
            }]);
        })
    })

    return (
        <div>
            { messages.map((message, index) => (
                // <Message username={ userMessage.name } userMessage={ userMessage.message }/>
                <h1 key={ index }>{ message.name }</h1>
            ))}
        </div>
    )
}
