import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { StylesProvider } from '@material-ui/core/styles';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import pollsReducer from './store/reducers/polls';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const store = createStore(pollsReducer, composeEnhancers(
    applyMiddleware(thunk)
))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <StylesProvider injectFirst>
                <App/>
            </StylesProvider>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render( app, document.getElementById('root') );
registerServiceWorker();
