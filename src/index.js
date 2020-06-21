import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StylesProvider } from '@material-ui/core/styles';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const app = (
    // <Provider>
        <BrowserRouter>
            <StylesProvider injectFirst>
                <App/>
            </StylesProvider>
        </BrowserRouter>
    // </Provider>
)

ReactDOM.render( app, document.getElementById('root') );
registerServiceWorker();
