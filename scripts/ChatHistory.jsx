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
            message: "Plwpflwefpwef"
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
        <div className="chat-history-container">
            <ul className="chat-history">
            { messages.map((message, index) => (
                <li key={ index }>{ message.name }: { message.message }</li>
            ))}
            </ul>
        </div>
    )
}
