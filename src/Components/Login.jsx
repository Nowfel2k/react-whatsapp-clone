import React from 'react'
import '../Styles/Login.css'
import { Button } from '@material-ui/core'
import { provider, auth } from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../Reducer'

function Login() {

    const [{ user }, dispatch] = useStateValue()

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://www.explore-liverpool.com/wp-content/uploads/2020/08/WhatsApp_logo_logotype_text.png" alt="Whatsapp Logo" />

                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
