import React, { useState, useEffect } from 'react';
async function getWordsData(){
    return [
        {word:"hello", meaning:"안녕", sents:["hello jaehyeon"]},
        {word:"world", meaning:"세계", sents:["hello world"]},
    ];
}

function Wordbook(){
    const [words, setWords] = useState([]);
    useEffect(()=>{
        // fetch data from firebase
        getWordsData()
        .then((data)=>{
            console.log(data);
            setWords(data);
        });
    }, []);
    return (<div>
        <WordList words={words}/>
    </div>);
}

function WordList({words}){
    return (
        <div>
            {words.map((wordUnit)=><WordUnit key={wordUnit.word} wordUnit={wordUnit}/>)}
        </div>
    );
    
}

function WordUnit({wordUnit}){
    return (
        <div>
            <div>
                <div>{wordUnit.word}</div>
                <div>{wordUnit.meaning}</div>
            </div>
            <div>
                {wordUnit.sents.map((sent)=><p>{sent}</p>)}
            </div>
        </div>
    )
}

export default Wordbook;