import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Top from './Top.js'
import cn from 'classnames';
import style from './BookShelf.module.css';

async function getData(){
    return [
        {title:"zzzzzzzz", author:"Conan", thumnail:"", id:"1"},
        {title:"dddddddddddddd", author:"Jane", thumnail:"", id:"2"},
        {title:"zzzzzzzz", author:"Conan", thumnail:"", id:"3"},
        {title:"zzzzzzzz", author:"Conan", thumnail:"", id:"4"},
        {title:"dddddddddddddd", author:"Jane", thumnail:"", id:"5"},
        {title:"dddddddddddddd", author:"Jane", thumnail:"", id:"6"},
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

export default BookShelf;