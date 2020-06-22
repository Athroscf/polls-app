import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

export class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar />
                <main className={classes.Layout}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
