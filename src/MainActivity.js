import React from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Home from './Home.js';
import Wordbook from './Wordbook.js';
import BookShelf from './BookShelf.js';
import {ReactComponent as IconHome} from './icon-home.svg';
// import IconBookshelf from './icon-bookshelf.svg';
// import IconWordbook from './icon-wordbook.svg';

const BottomNavSelected = {
    color: "red",
};

const BottomPadding = {
    height:"10vh",
};

const BottomNavBar = {
    // backgroundColor: white,
    display:"flex",
    position:"fixed",
    bottom:"0",
    left:"0",
    width:"100%",
    height:"10vh",
    padding: "5px 0",
    borderTop: "1px solid black",
};

function MainActivity() {
    return (
        <div>
            <div>
                <Switch>
                    <Route path="/bookshelf" component={BookShelf}></Route>
                    <Route path="/wordbook" component={Wordbook}></Route>
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
            <div style={BottomPadding}></div>
            <div style={BottomNavBar}>
                <NavLink to="/home" activeStyle={BottomNavSelected}><IconHome  height="70%"/></NavLink>
                <NavLink to="/bookshelf" activeStyle={BottomNavSelected}>내책</NavLink>
                <NavLink to="/wordbook" activeStyle={BottomNavSelected}>단어장</NavLink>
            </div>
        </div>
    );
}

export default MainActivity;