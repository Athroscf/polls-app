import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';

const toolbar = ( props ) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.Toolbar}>
                    <div>
                        <NavigationItems
                            content="Web de Encuestas"
                            variant="h5"
                            link="/"
                            exact={true} />
                    </div>
                    <div>
                        { !props.isAuth ?
                            <NavigationItems
                                content="Iniciar Sesion"
                                variant="h6"
                                link="/auth"
                                exact={false} /> :
                            <NavigationItems
                                content="Cerrar Sesion"
                                variant="h6"
                                link="/logout"
                                exact={false} />
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default toolbar;
