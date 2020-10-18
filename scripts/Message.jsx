import * as React from 'react';

export default function Message({ username, userMessage, userType }) {
        
    return (
        <div>
            <div className="user-name">User: { username }</div>
            <div className={ userType } dangerouslySetInnerHTML={{__html: userMessage }} />
        </div>
    )
}
