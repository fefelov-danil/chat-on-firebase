import {ROUTES} from "utils/consts";
import {Login} from "component/Login";
import {Chat} from "component/Chat";

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
