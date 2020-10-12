import * as React from 'react';
import { Socket } from "./Socket";

export default function Message({ username, userMessage }) {
        
    return (
        <div>
            <div className="user-name">{ username }</div>
            {/* <div className="user-message">{ userMessage }</div> */}
            <div className="user-message" dangerouslySetInnerHTML={{__html: userMessage }} />
        </div>
    )
}
