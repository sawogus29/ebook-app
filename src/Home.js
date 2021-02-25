import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Top from './Top.js';
import cn from 'classnames';
// import style from './Home.module.css';
import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase';

async function getData(){
    const bookMetaRef = firebase.database().ref('book-metas/');
    const bookMetas = await bookMetaRef.once('value');
    // console.log(Object.values(bookMetas.val()))
    return Object.values(bookMetas.val());
    // return [
    //     {title:"The Adventures of Sherlock Holmes", author:"Arthur Conan Doyle", thumnail:"https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg", id:"1"},
    //     {title:"Pride And Prejudice", author:"Jane Austen", thumnail:"http://www.gutenberg.org/cache/epub/1342/pg1342.cover.small.jpg", id:"2"},
    // ];
}

function Home(){
    const [books, setBooks] = useState([]);
    useEffect(()=>{
        getData()
        .then((data)=>{
            setBooks(data);
        });
    },[]);
    return (<div>
        <Top title="홈" />
        <BookList books={books}/>
    </div>);
}

const useStyles = makeStyles({
    bookList:{
        borderRadius: "5px",
        boxShadow: "0px 0px 5px grey",
        margin: "10px 10px",
        padding: "0px 5px"
    },
    bookUnit:{
        display:"flex",
        // borderTop: "1px solid grey",
        padding: "5px 10px",
        alignItems: "center",
    },
    thumbnail: {
        flex:0,
        marginRight: "20px",
        width: "10vw",
        height: "15vw",
    },
    descWrapper: {
        flex:1,
    },
    title: {
        // fontWeight: "bold",
        lineHeight: 1.2,
        marginBottom: '0.5em',
    },
    author: {
    },
})

function BookList({books}){
    const classes = useStyles();
    return (<div className={cn(classes.bookList)}>
        {books.map((book, i)=><React.Fragment key={book.id}>
            {i>0 && <Divider/>}
            <BookUnit key={book.title} book={book}/>
        </React.Fragment>)}
    </div>);
}

function BookUnit({book}){
    const classes = useStyles();
    const history = useHistory();
    return (<div className={cn(classes.bookUnit)} onClick={()=>history.push(`/reader/${book.id}`)}>
        <img className={cn(classes.thumbnail)} src={book.thumnail} alt="thumbnail"></img>
        <div className={cn(classes.descWrapper)}>
            <Typography variant="subtitle1" color="initial" className={classes.title}>{book.title}</Typography>
            <Typography variant="subtitle2" color="initial">{book.author}</Typography>
            {/* <div className={cn(classes.title)}>{book.title}</div>
            <div className={cn(classes.author)}>{book.author}</div> */}
        </div>
    </div>);
}

export default Home;