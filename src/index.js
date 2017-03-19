import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./components/App.js";
import SelectMode from "./components/SelectMode";
import SelectMark from "./components/SelectMark";
import Play from "./components/Play";



ReactDOM.render((
    <Router>
        <App>
            <Route exact path="/" component={SelectMode}/>
            <Route path="/SelectMode/" component={SelectMode}/>
            <Route path="/SelectMark/:mode" component={SelectMark}/>
            <Route path="/Play/:mode/:mark" component={Play}/>
        </App>
    </Router>)
, document.getElementById("app"));