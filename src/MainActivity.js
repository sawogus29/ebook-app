import React from 'react';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import BookshelfIcon from '@material-ui/icons/LocalLibrary';
import WordbookIcon from '@material-ui/icons/Favorite';
import Home from './Home.js';
import Wordbook from './Wordbook.js';
import BookShelf from './BookShelf.js';

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
            <SimpleBottomNavigation />
        </div>
    );
}

const useStyles = makeStyles({
  root: {
    width: "100vw",
    position: "fixed",
    bottom:0,    
  },
});

function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation value={value} onChange={(event, newValue) => { setValue(newValue); }} showLabels className={classes.root} >
      <BottomNavigationAction component={Link} to="/home" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction component={Link} to="/BookShelf" label="BookShelf" icon={<BookshelfIcon />} />
      <BottomNavigationAction component={Link} to="/Wordbook" label="Wordbook" icon={<WordbookIcon />} />
    </BottomNavigation>
  );
}

export default MainActivity;