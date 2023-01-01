import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import {NavLink} from "react-router-dom";
import {ROUTES} from "common/routes/Pages";
import {useAppDispatch, useAppSelector} from "utils/hooks";
import {logout} from "bll/reducers/chat-reducer";

export const Header = () => {
  const dispatch = useAppDispatch()
  const authorization = useAppSelector(state => state.chat.auth)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      <AppBar color={'primary'} position="static">
        <Toolbar variant={'dense'}>
          <Grid container justifyContent={'flex-end'}>
            {authorization
              ? <Button
                onClick={logoutHandler}
                color={'inherit'}
                variant={'outlined'}>Выйти</Button>
              : <NavLink to={ROUTES.LOGIN}>
                <Button color={'inherit'} variant={'outlined'}>Логин</Button>
              </NavLink>}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};