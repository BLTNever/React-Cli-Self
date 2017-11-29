import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import Routes from './routes/';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
        <Provider store={store}>
            <Routes />
            {/* <Router history={history} routes={Routes} /> */}
        </Provider>
    ,
    document.getElementById('root')
);

 