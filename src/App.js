import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainActivity from './MainActivity.js';
import Reader from './Reader.js';
import { CssBaseline } from '@material-ui/core';
import './word-apis';

function App(){
    // firebase.App().
    return (<>
        <CssBaseline/>
        <BrowserRouter>
            <Switch>
                <Route path="/reader" component={Reader}></Route>
                <Route path="/" component={MainActivity}></Route>
            </Switch>
        </BrowserRouter>
    </>);
}

export default App;