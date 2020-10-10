    
import * as React from 'react';


import { Button } from './Button';
import { Socket } from './Socket';
import ChatHistory from './ChatHistory';
import { MessageForm } from './MessageForm';
import Message from './Message';

export function Content() {
    // const [number, setNumber] = React.useState([]);
    // const [error, setError] = React.useState("");
    // const [output, setOutput] = React.useState("");

    // React.useEffect(() => {
    //     Socket.on("number received", (data) => {
    //         console.log("Received a number from server: " + data['number']);
    //         setNumber(data['number']);
    //         setOutput("Added to list: " + data["item"]);
    //     })
    // });

    // React.useEffect(() => {
    //     Socket.on("error received", (data) => {
    //         console.log("Already exists: " + data['error']);
    //         setError(data['error']);
    //         setOutput("Item already exists: " + data["error"]);
    //     })
    // });

    const [chatHistory, setChatHistory] = React.useState([]);

    return (
        <div>
            {/* <h1>Grocery List!</h1>
            <span> Your Grocery list contains:</span> */}
            {/* <ul>
                {number.map(num => (
                    <li> {num} </li>
                ))}
            </ul> */}
            <ChatHistory />
            {/* <Button /> */}
            <MessageForm />
            {/* <span>{output}</span> */}
        </div>
    );
}
