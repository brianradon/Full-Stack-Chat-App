import * as React from 'react';

export default function Message({ pfp, username, userMessage, userType, verf }) {
        
    return (
        <div className="message-container">
            <div className="profile-container">
                <span className="pfp"><img className="profile-picture" src={ pfp }  alt=""/></span>
                <span className={verf}>{ username }</span>
            </div>
            <div className={ userType } dangerouslySetInnerHTML={{__html: userMessage }} />
        </div>
    )
}
