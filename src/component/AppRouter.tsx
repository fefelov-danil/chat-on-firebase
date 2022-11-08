import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Chat} from "component/chat/Chat";
import {Login} from "component/login/Login";
import {ROUTES} from "utils/consts";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "index";

export const AppRouter = () => {
    const context = useContext(Context)
    const [user] = useAuthState(context.auth)

    return user ?
        (
            <Routes>
                <Route path={ROUTES.CHAT} element={<Chat/>}/>
                <Route path={'*'} element={<Navigate to={ROUTES.CHAT}/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                <Route path={'*'} element={<Navigate to={ROUTES.LOGIN}/>}/>
            </Routes>
        );
};