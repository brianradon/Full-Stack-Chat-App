import React from 'react'
import { GoogleLogin } from 'react-google-login';

const { REACT_APP_KEY } = process.env;

export default function Login() {
    const onSuccess = (response) => {
        console.log('[Login Sucess] currentUser:', response.profileObj);
        console.log('[Login Sucess] currentUser:', response.profileObj.name);
    }

    const onFailure = (response) => {
        console.log('[Login Failed] response:', response);
    }

    return (
        <div className="google-login hidden">
            <GoogleLogin
                clientId={ REACT_APP_KEY }
                buttonText="Login"
                onSuccess={ onSuccess }
                onFailure={ onFailure }
                cookiePolicy={ 'single_host_origin' }
                style={{ width: '100%' }}
                isSignedIn={ true }
            />
        </div>
    )
}
