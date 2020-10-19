import * as React from 'react';
import { Socket } from "./Socket";
import Message from "./Message";



export default function ChatHistory() {
    const [pfps, setPfps] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [messages, setMessages] = React.useState([]);
    const [type, setTypes] = React.useState([]);
    const [verifieds, setVerifieds] = React.useState([]);

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
        setPfps(data["all_pfps"])
        setUsers(data["all_users"])
        setMessages(data["all_messages"])
        setTypes(data["all_types"])
        setVerifieds(data["all_verified"])
    }

    getChatHistory();
    return (
        <div className="chat-history-container">
            <ul className="chat-history">
            { messages.map((message, index) => (
                <Message key={ index } pfp= {pfps[index] } username = { users[index] }userMessage={ message } userType={ type[index] } verf={ verifieds[index] }/>
            ))}
            </ul>
            <div ref={bottomRef} />
        </div>
    )
}
