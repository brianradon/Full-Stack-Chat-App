import * as React from 'react';

import ChatHistory from './ChatHistory';
import { MessageForm } from './MessageForm';
import "./App.css";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Login from "./Login";

export function Content() {
    const num = Math.ceil(Math.random() * 100000000);

    return (
        <div>
            <Navbar />
            <div className="container">
                <Sidebar />
                <div className="chat-container">
                    <ChatHistory />
                    <Login userID={num} />
                    <MessageForm userID={num} />
                </div>
            </div>
            <img className="wallpaper" src="../static/img/poke-wallpaper.jpg" alt=""/>
        </div>
    );
}
