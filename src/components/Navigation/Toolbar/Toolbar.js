import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <NavigationItems />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default toolbar;
