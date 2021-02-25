import React from 'react';
import {Route, Link, Switch, Redirect, useLocation, useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
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
  dummy:{
    width: "100vw",
    position: "static",
  }
});

function SimpleBottomNavigation() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const navData = ['home', 'BookShelf', 'Wordbook'];
  const current = location.pathname.split('/').slice(-1)[0];
  const currentIndex = navData.indexOf(current) < 0? 0: navData.indexOf(current);
  const [value, setValue] = React.useState(currentIndex);

  return (<>
    <Paper className={classes.root}>
    <Divider />
    <BottomNavigation value={value} onChange={(event, newValue) => { setValue(newValue); history.replace(`/${navData[newValue]}`);}} showLabels >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="BookShelf" icon={<BookshelfIcon />} />
      <BottomNavigationAction label="Wordbook" icon={<WordbookIcon />} />
    </BottomNavigation>
    </Paper>
    <BottomNavigation className={classes.dummy}/>
  </>);
}

export default MainActivity;