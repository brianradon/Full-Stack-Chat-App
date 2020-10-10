import * as React from 'react';
import { Socket } from "./Socket";

export default function Message({ username, userMessage }) {

    return (
        <div className="user-message">
            <div className="user-name">{ username }</div>
            <div className="user-message">{ userMessage }</div>
        </div>
    )
}
