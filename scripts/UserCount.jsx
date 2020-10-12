import * as React from 'react';
import { Socket } from "./Socket";

export default function UserCount() {
    const [userCount, setUserCount] = React.useState(0);

    React.useEffect(() => {
        Socket.on("userCount to client", (data)=> {
            console.log("Received a message: " + data["userCount"]);
            setUserCount(data["userCount"]);
        })
    });

    return (
        <div>
            
        </div>
    )
}
