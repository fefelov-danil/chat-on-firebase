import {Login} from "components/login/Login";
import {Chat} from "components/chat/Chat";
import {ROUTES} from "common/routes/Pages";

export const publicRoutes = [
    {
        path: ROUTES.LOGIN,
        Component: Login
    }
]

export const privateRoutes = [
    {
        path: ROUTES.CHAT,
        Component: Chat
    }
]
