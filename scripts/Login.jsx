import React from 'react'
import { GoogleLogin } from 'react-google-login';

export default function Login() {
    const onSuccess = (response) => {
        console.log('[Login Sucess] currentUser:', response.profileObj);
        console.log('[Login Sucess] currentUser:', response.profileObj.name);
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
                isSignedIn={ true }
            />
        </div>
    )
}
