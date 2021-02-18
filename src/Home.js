import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Top from './Top.js';
import cn from 'classnames';
import style from './Home.module.css';

async function getData(){
    return [
        {title:"sherlock", author:"Conan", thumnail:"", id:"1"},
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

function BookList({books}){
    return (<div className={cn(style.bookList)}>
        {books.map((book)=><BookUnit key={book.title} book={book}/>)}
    </div>);
}

function BookUnit({book}){
    return (<div className={cn(style.bookUnit)}>
        <Link to={`/reader/${book.id}`} className={cn(style.noLink)}>
        <img className={cn(style.thumnail)} src={book.thumnail} alt="thumbnail"></img>
        <div className={cn(style.descWrapper)}>
            <div className={cn(style.title)}>{book.title}</div>
            <div className={cn(style.author)}>{book.author}</div>
        </div>
        </Link>
    </div>);
}

export default Home;