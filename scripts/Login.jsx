import React from 'react'
import { GoogleLogin } from 'react-google-login';

const KEY = process.env.REACT_APP_KEY;

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
                clientId={KEY}
                buttonText="Login"
                onSuccess={ onSuccess }
                onFailure={ onFailure }
                cookiePolicy={ 'single_host_origin' }
                isSignedIn={ true }
            />
        </div>
    )
}
