import * as React from 'react';
import { Socket } from './Socket';

export function Button() {

    let number = React.useRef();

    function handleSubmit(event) {
    
        console.log(number.current.value);
        
        Socket.emit("new number", {
            "number": number.current.value,
        });
    
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={number}/>
            <button type="Submit">Add Grocery Item</button>
        </form>
    );
}
