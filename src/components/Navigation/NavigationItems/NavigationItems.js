import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import Title from './Title/Title';
// import LoginButton from './Login/LoginButton';

import classes from './NavigationItems.css'

const navigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem>
                <Title content="Web de Encuestas"/>
            </NavigationItem>
            {/* <NavigationItem>
                <LoginButton content="Iniciar Sesion"/>
            </NavigationItem> */}
        </ul>
    )
}

export default navigationItems;
