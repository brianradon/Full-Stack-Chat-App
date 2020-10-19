import * as React from 'react';

export default function Message({ pfp, username, userMessage, userType, verf }) {
        
    return (
        <div>
            <div className="profile-container">
                <div className="pfp"><img className="profile-picture" src={ pfp }  alt=""/></div>
                <div className={verf}>User: { username }</div>
            </div>
            <div className={ userType } dangerouslySetInnerHTML={{__html: userMessage }} />
        </div>
    )
}
