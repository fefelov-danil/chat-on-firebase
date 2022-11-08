import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {ROUTES} from "utils/consts";
import {Context} from "index";
import {useAuthState} from "react-firebase-hooks/auth";

export const Navbar = () => {
    const context = useContext(Context)
    const [user] = useAuthState(context.auth)

    return (
        <div>
            <AppBar color={'primary'} position="static">
                <Toolbar variant={'dense'}>
                    <Grid container justifyContent={'flex-end'}>
                        {user
                            ? <Button
                                onClick={() => context.auth.signOut()}
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