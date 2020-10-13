import * as React from 'react';
import { Socket } from "./Socket";

export default function Message({ username, userMessage, userType }) {
        
    return (
        <div>
            <div className="user-name">User: { username }</div>
            <div className={ userType } dangerouslySetInnerHTML={{__html: userMessage }} />
        </div>
    )
}
