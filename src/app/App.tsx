import React, {useContext} from 'react';
import s from './App.module.css'
import 'assets/general-css/reset.css'
import 'assets/general-css/style.css'
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "component/Navbar";
import {AppRouter} from "component/AppRouter";
import mainBg from 'assets/images/fon-1.jpg'
import {CircularProgress} from "@mui/material";
import {Context} from "index";
import {useAuthState} from "react-firebase-hooks/auth";

export const App = () => {
    const context = useContext(Context)
    const [user, loading] = useAuthState(context.auth)

    return (
      <div className={s.app}
           style = {{backgroundImage: `url('${mainBg}')`}}>
          <BrowserRouter>
              <Navbar/>
              { loading
                  ? <div className={'circularProgress'}><CircularProgress /></div>
                  : <AppRouter/>
              }
          </BrowserRouter>
      </div>

    );
}