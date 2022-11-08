import React, {useContext} from 'react';
import s from './Login.module.css'
import Button from "@mui/material/Button";
import firebase from 'firebase/compat/app';
import {Context} from "index";

export const Login = () => {
    const context = useContext(Context)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const userInfo = await context?.auth.signInWithPopup(provider)
        console.log(userInfo?.user)
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