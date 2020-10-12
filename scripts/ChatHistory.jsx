import * as React from 'react';
import { Socket } from "./Socket";
import Message from "./Message";
import { get } from 'jquery';



export default function ChatHistory() {

    const [messages, setMessages] = React.useState([]);

    const bottomRef = React.useRef(null);
    React.useEffect(() => {
        bottomRef.current.scrollIntoView({behavior: 'smooth'});
    })
    
    

    function getChatHistory() {
        React.useEffect(() => {
            Socket.on("all messages received", updateChatHistory);
            return () => {
                Socket.off("all messages received", updateChatHistory);
            }
        })
    }

    function updateChatHistory(data) {
        console.log("Received message from server: " + data["all_messages"])
        setMessages(data["all_messages"])
    }

    getChatHistory();
    return (
        <div className="chat-history-container">
            <ul className="chat-history">
            { messages.map((message, index) => (
                // <Message key={ index } username={ message.name } userMessage={ message.message }  />
                
                // <li key={index}>{ message }</li>
                <Message key={ index } userMessage={ message }  />
            ))}
            </ul>
            <div ref={bottomRef} />
        </div>
    )
}
