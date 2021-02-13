import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainActivity from './MainActivity.js';
import Reader from './Reader.js';

function App(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/reader" component={Reader}></Route>
                <Route path="/" component={MainActivity}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;