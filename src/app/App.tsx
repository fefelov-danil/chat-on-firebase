import React, {useEffect} from 'react';
import s from './App.module.css'
import 'assets/general-css/reset.css'
import 'assets/general-css/style.css'
import {BrowserRouter} from "react-router-dom";
import {Header} from "common/header/Header";
import {Pages} from "common/routes/Pages";
import mainBg from 'assets/images/fon-1.jpg'
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import {useAppDispatch, useAppSelector} from "utils/hooks";
import {login, setLoading, UserType} from "bll/reducers/chat-reducer";
import CircularProgress from '@mui/material/CircularProgress';

export const App = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.chat.isLoading)

  const auth = getAuth();
  useEffect(() => {
    dispatch(setLoading(true))
    onAuthStateChanged(auth, () => {
      dispatch(login(auth.currentUser as UserType))
      dispatch(setLoading(false))
    });
  }, [])

  return (
    <div className={s.app}
         style={{backgroundImage: `url('${mainBg}')`}}>
      <BrowserRouter>
        <Header/>
        {loading ? (
          <div className={'circularProgress'}><CircularProgress/></div>
        ) : (
          <Pages/>
        )}
      </BrowserRouter>
    </div>

  );
}