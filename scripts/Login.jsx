import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { Socket } from "./Socket";

export default function Login( {userID} ) {
    const onSuccess = (response) => {
        console.log('[Login Sucess] currentUser:', response.profileObj);
        console.log('[Login Sucess] currentUser:', response.profileObj.email);
        console.log('[Login Sucess] currentUser:', response.profileObj.imageUrl);

        Socket.emit("oauth to server", {
            "userID": {userID}.userID,
            "imgurl": response.profileObj.imageUrl,
            "name": response.profileObj.email,
        });
    }

    const onFailure = (response) => {
        console.log('[Login Failed] response:', response);
    }

    return (
        <div className="google-login">
            <GoogleLogin
                clientId='338963299857-ljp88d5pm444n5g7f18ocek5k0olah9d.apps.googleusercontent.com'
                buttonText="Login"
                onSuccess={ onSuccess }
                onFailure={ onFailure }
                cookiePolicy={ 'single_host_origin' }
                isSignedIn={ false }
            />
        </div>
    )
}
