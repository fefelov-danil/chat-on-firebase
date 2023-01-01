import React from 'react';
import s from './Login.module.css'
import Button from "@mui/material/Button";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const Login = () => {
    const auth = getAuth();

    const login = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
    }

    return (
        <div className={s.login}>
            <div className={s.loginContainer}>
                <h1>Login</h1>
                <Button
                    onClick={login}
                    size={'large'}
                    color={'secondary'}
                    variant={'contained'}>Войти с помощью Google</Button>
            </div>
        </div>
    );
};