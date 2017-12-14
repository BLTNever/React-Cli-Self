
import React from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "../store/configureStore";

import Home from "../modules/home/";

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

history.listen(location => {
    let pathname = location.pathname;
    pathname = pathname.replace(/\//g, "_");
    pathname = pathname.toLowerCase();
});

const  Routes = () => {
    console.info(require("../modules/home"))
        return (
            <Router history={history} >
                <Route path="/home" component={Home} />
                <Route path="/default" component={require("../modules/default/").default} />

                <Route path="*" component={require("../components/404/").default} />
            </Router>
        ) 
};


export default Routes;