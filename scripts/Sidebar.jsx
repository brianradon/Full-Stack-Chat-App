import React from 'react'

export default function Sidebar() {
    return (
        <div className="side-bar">
            <h1 className="rule-title">Chat Rules</h1>
            <ul className="side-rules">
                <li>Authenticate before sending messages.</li>
                <br/>
                <li>Only verified users can send messages.</li>
                <br/>
                <li>Verified users are displayed in chat with a <strong className="blue-shade">blue border</strong>.</li>
                <br/>
                <li>You can post images.  Keep the url length short.</li>
                <br/>
                <li>Type in <strong className="goldenrod">!! help</strong> for a list of available commands!</li>
                <br/>
            </ul>
        </div>
    )
}
