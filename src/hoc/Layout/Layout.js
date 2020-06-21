import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Home from '../../containers/Home/Home';
import classes from './Layout.css';

export class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar />
                <main className={classes.Layout}>
                    <Home />
                </main>
            </Aux>
        )
    }
}

export default Layout;
