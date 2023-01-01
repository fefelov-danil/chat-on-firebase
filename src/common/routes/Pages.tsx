import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Chat} from "components/chat/Chat";
import {Login} from "components/login/Login";
import {useAppSelector} from "utils/hooks";

export const ROUTES = {
  LOGIN: '/login',
  CHAT: '/chat'
}

export const Pages = () => {
    const auth = useAppSelector(state => state.chat.auth)

    return auth ?
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