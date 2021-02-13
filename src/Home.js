import React, { useEffect, useState } from 'react';
async function getData(){
    return [
        {title:"sherlock", author:"Conan", thumnail:""},
        {title:"PrideAndPrejudice", author:"Jane", thumnail:""},
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
        <BookList books={books}/>
    </div>);
}

function BookList({books}){
    return (<div>
        {books.map((book)=><BookUnit key={book.title} book={book}/>)}
    </div>);
}

function BookUnit({book}){
    return (<div>
        <img src={book.thumnail} alt="thumbnail"></img>
        <div>
            <div>{book.title}</div>
            <div>{book.author}</div>
        </div>
    </div>);
}

export default Home;