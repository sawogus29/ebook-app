import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Top from './Top.js'
import cn from 'classnames';
import style from './BookShelf.module.css';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea, CardContent, Typography } from '@material-ui/core';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
      margin: "10px 10px",
  },
  card: {
    maxWidth: 345,
    height:"100%",
    // margin: "10px 10px",
  },
  wrap: {
    //   overflow:"hidden",
    //   textOverflow: "ellipsis",
    //   whiteSpace: "nowrap",
  },
  content: {
    // backgroundColor: 'rgba(0,0,0,0.5)',
    // opacity: 0.5,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


async function getData(){
    return [
        {title:"Pride And Prejudice", author:"Jane Austen", thumnail:"http://www.gutenberg.org/cache/epub/1342/pg1342.cover.small.jpg", id:"2"},
    ];
}

function BookShelf(){
    const [books, setBooks] = useState([]);
    useEffect(()=>{
        getData()
        .then((data)=>{
            setBooks(data);
        });
    },[]);
    return (<div>
        <Top title="내 책" />
        <BookList books={books}/>
    </div>);
}

function BookList({books}){
    const classes = useStyles();
    return (<>
    <div className={classes.root}>
    <Grid container spacing={2}>
        {books.map((book)=>
            <Grid item xs={6} sm={3}>
                <BookUnit book={book}/>
            </Grid>
        )}
    </Grid>
    </div>
    </>);
}

function BookUnit({book}) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.card} onClick={()=>history.push(`/reader/${book.id}`)}>
      <CardActionArea>
          <CardMedia
            className={classes.media}
            image={book.thumnail}
          />
          <CardContent className={classes.content}>
              <Typography component="div" variant="h6" color="initial" className={classes.wrap}>{book.title}</Typography>
            <Typography component="div" variant="body1" color="initial" className={classes.wrap}>{book.author}</Typography>
          </CardContent>
      </CardActionArea>
    </Card>
  );
}


// function BookUnit({book}){
//     return (<div className={cn(style.bookUnit)}>
//         <Link to={`/reader/${book.id}`} className={cn(style.noLink)}>
//         <img className={cn(style.thumnail)} src={book.thumnail} alt="thumbnail"></img>
//         <div className={cn(style.descWrapper)}>
//             <div className={cn(style.title)}>{book.title}</div>
//             <div className={cn(style.author)}>{book.author}</div>
//         </div>
//         </Link>
//     </div>);
// }

export default BookShelf;