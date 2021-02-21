import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Top from './Top.js';
import cn from 'classnames';
// import style from './Home.module.css';
import { Box, makeStyles, Typography } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase';

async function getData(){
    const bookMetaRef = firebase.database().ref('/book-meta');
    const bookMetas = await bookMetaRef.once('value');
    console.log(bookMetas);
    // return Object.values(bookMetas);
    return [
        {title:"sherlock", author:"Conan", thumnail:"http://www.gutenberg.org/cache/epub/1342/pg1342.cover.small.jpg", id:"1"},
        {title:"PrideAndPrejudice", author:"Jane", thumnail:"", id:"2"},
    ];
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
        borderTop: "1px solid grey",
        padding: "5px 10px",
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
        fontWeight: "bold",
    },
    author: {
    },
})

function BookList({books}){
    const classes = useStyles();
    return (<div className={cn(classes.bookList)}>
        {books.map((book)=><BookUnit key={book.title} book={book}/>)}
    </div>);
}

function BookUnit({book}){
    const classes = useStyles();
    const history = useHistory();
    return (<div className={cn(classes.bookUnit)} onClick={()=>history.push(`/reader/${book.id}`)}>
        <img className={cn(classes.thumbnail)} src={book.thumnail} alt="thumbnail"></img>
        <div className={cn(classes.descWrapper)}>
            <Typography variant="subtitle1" color="initial">{book.title}</Typography>
            <Typography variant="subtitle2" color="initial">{book.author}</Typography>
            {/* <div className={cn(classes.title)}>{book.title}</div>
            <div className={cn(classes.author)}>{book.author}</div> */}
        </div>
    </div>);
}

export default Home;