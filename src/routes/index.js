
import React from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
// import App from "../modules/home/";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "../store/configureStore";

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
                {/* <IndexRoute component={require("./modules/home/")} /> */}
                <Route path="/home" component={require("../modules/home/").default} />
                <Route path="/default" component={require("../modules/default/").default} />

                <Route path="*" component={require("../components/404/").default} />
            </Router>
        ) 
};


export default Routes;