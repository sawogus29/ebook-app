import React, { useState, useEffect } from 'react';
import style from './Wordbook.module.css';
import Top from './Top.js'
import firebase from 'firebase';
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core';

async function getWordsData(){
    const userId = "jaehyeon";
    const wordRef = firebase.database().ref(`users/${userId}/words/`);
    const snapshot = await wordRef.orderByChild('time').once('value');

    return Object.values(snapshot.val());
    // return [
    //     {word:"hello", meaning:"안녕", sents:["hello jaehyeon"]},
    //     {word:"world", meaning:"세계", sents:["hello world"]},
    // ];
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
        <Top title="단어장"/>
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
        <div className={`${style.wordUnit}`}>
            <div className={`${style.wordWrapper}`}>
                <div className={`${style.word}`}>{wordUnit.word}</div>
                <div className={`${style.meaning}`}>{wordUnit.meaning}</div>
            </div>
            <div className={`${style.sents}`}>
                {wordUnit.sents.map((aSent, i)=>
                    <>
                    {i > 0 && <Divider/>}
                    <p key={i} className={`${style.sent}`}>{aSent.sent}</p>
                    <p className={`${style.src}`}>- {aSent.src}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Wordbook;