import * as React from 'react';
import { Socket } from './Socket';

// function handleSubmit(event) {
//     let random = "Math.floor(Math.random() * 100)";

//     console.log('Generated a random number: ', random);
    
//     Socket.emit('new number', {
//         'number': random,
//     });
    
//     console.log('Sent a random number ' + random + ' to server!');

//     event.preventDefault();
// }

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
