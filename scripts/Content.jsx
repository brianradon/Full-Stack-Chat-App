import * as React from 'react';

import ChatHistory from './ChatHistory';
import { MessageForm } from './MessageForm';
import "./App.css";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Login from "./Login";

export function Content() {
    
    return (
        <div>
            <Navbar />
            <div className="container">
                <Sidebar />
                <div className="chat-container">
                    <ChatHistory />
                    <Login />
                    <MessageForm />
                </div>
            </div>
            <img className="wallpaper" src="../static/img/poke-wallpaper.jpg" alt=""/>
        </div>
    );
}
