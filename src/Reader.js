import React, {useState, useEffect, useRef} from 'react';
import ContentsContainer from './ContentsContainer.js';
import Top from './Top.js';
import Bottom from './Bottom.js';

async function getData(){
    const contents = `<p><span class="sent" data-dif = "2">In West Berlin in 1963, <span class="subj">President Kennedy</span> <span class="verb">delivered</span> <span class="obj">his most eloquent speech</span> on the world stage.</span>
    <span class="sent" data-dif = "2"><span class="subj">The director of the John F. Kennedy Presidential Library and Museum</span> <span class="verb">tells</span> <span class="obj">the evocative story behind JFK’s words</span>.</span>
    </p>
    <p><span class="sent" data-dif = "2">other than ask not, <span class="subj">they</span> <span class="verb">were</span> <span class="obj">the most-famous words he ever spoke</span>.</span>
    <span class="sent" data-dif = "2"><span class="subj">They</span> <span class="verb">drew</span> <span class="obj">the world’s attention</span> to what he considered the hottest spot <span class="aux">in the Cold War</span>.</span>
    <span class="sent" data-dif = "1">Added at the last moment and scribbled in his own hand, <span class="obj">they</span> <span class="verb">were not</span>, like the oratory in most of his other addresses, <span class="verb">chosen</span> by talented speechwriters.</span>
    <span class="sent" data-dif = "1">And for a man notoriously tongue-tied when it came to foreign languages, <span class="subj">the four words</span> <span class="verb">weren't</span> even in English.</span>
    </p><p><span class="sent" data-dif = "2">In West Berlin in 1963, <span class="subj">President Kennedy</span> <span class="verb">delivered</span> <span class="obj">his most eloquent speech</span> on the world stage.</span>
    <span class="sent" data-dif = "2"><span class="subj">The director of the John F. Kennedy Presidential Library and Museum</span> <span class="verb">tells</span> <span class="obj">the evocative story behind JFK’s words</span>.</span>
    </p>
    <p><span class="sent" data-dif = "2">other than ask not, <span class="subj">they</span> <span class="verb">were</span> <span class="obj">the most-famous words he ever spoke</span>.</span>
    <span class="sent" data-dif = "2"><span class="subj">They</span> <span class="verb">drew</span> <span class="obj">the world’s attention</span> to what he considered the hottest spot <span class="aux">in the Cold War</span>.</span>
    <span class="sent" data-dif = "1">Added at the last moment and scribbled in his own hand, <span class="obj">they</span> <span class="verb">were not</span>, like the oratory in most of his other addresses, <span class="verb">chosen</span> by talented speechwriters.</span>
    <span class="sent" data-dif = "1">And for a man notoriously tongue-tied when it came to foreign languages, <span class="subj">the four words</span> <span class="verb">weren't</span> even in English.</span>
    </p><p><span class="sent" data-dif = "2">In West Berlin in 1963, <span class="subj">President Kennedy</span> <span class="verb">delivered</span> <span class="obj">his most eloquent speech</span> on the world stage.</span>
    <span class="sent" data-dif = "2"><span class="subj">The director of the John F. Kennedy Presidential Library and Museum</span> <span class="verb">tells</span> <span class="obj">the evocative story behind JFK’s words</span>.</span>
    </p>
    <p><span class="sent" data-dif = "2">other than ask not, <span class="subj">they</span> <span class="verb">were</span> <span class="obj">the most-famous words he ever spoke</span>.</span>
    <span class="sent" data-dif = "2"><span class="subj">They</span> <span class="verb">drew</span> <span class="obj">the world’s attention</span> to what he considered the hottest spot <span class="aux">in the Cold War</span>.</span>
    <span class="sent" data-dif = "1">Added at the last moment and scribbled in his own hand, <span class="obj">they</span> <span class="verb">were not</span>, like the oratory in most of his other addresses, <span class="verb">chosen</span> by talented speechwriters.</span>
    <span class="sent" data-dif = "1">And for a man notoriously tongue-tied when it came to foreign languages, <span class="subj">the four words</span> <span class="verb">weren't</span> even in English.</span>
    </p><p><span class="sent" data-dif = "2">In West Berlin in 1963, <span class="subj">President Kennedy</span> <span class="verb">delivered</span> <span class="obj">his most eloquent speech</span> on the world stage.</span>
    <span class="sent" data-dif = "2"><span class="subj">The director of the John F. Kennedy Presidential Library and Museum</span> <span class="verb">tells</span> <span class="obj">the evocative story behind JFK’s words</span>.</span>
    </p>
    <p><span class="sent" data-dif = "2">other than ask not, <span class="subj">they</span> <span class="verb">were</span> <span class="obj">the most-famous words he ever spoke</span>.</span>
    <span class="sent" data-dif = "2"><span class="subj">They</span> <span class="verb">drew</span> <span class="obj">the world’s attention</span> to what he considered the hottest spot <span class="aux">in the Cold War</span>.</span>
    <span class="sent" data-dif = "1">Added at the last moment and scribbled in his own hand, <span class="obj">they</span> <span class="verb">were not</span>, like the oratory in most of his other addresses, <span class="verb">chosen</span> by talented speechwriters.</span>
    <span class="sent" data-dif = "1">And for a man notoriously tongue-tied when it came to foreign languages, <span class="subj">the four words</span> <span class="verb">weren't</span> even in English.</span>
    </p>`;

    return {
        title: 'Ich libe dich',
        contents,
    }
}

function Reader(){
    const [isMenuShowing, setIsMenuShowing] = useState(true);
    const [title, setTitle] = useState("title");
    const [contents, setContents] = useState("<p></p>");
    const [isColorActive, setIsColorActive] = useState(false);
    useEffect(()=>{
        getData()
        .then((data)=>{
            setTitle(data.title);
            setContents(data.contents);
        });
    },[]);

    function onDblClick(evt){
        evt.stopPropagation();
    }
    
    function onClick(evt){
    }
    
    function onScrollUp(evt){
        if (isMenuShowing === false){
            setIsMenuShowing(true);
        }
    }
    
    function onScrollDown(evt){
        if (isMenuShowing){
            setIsMenuShowing(false);
        }
    }
    
    return (<div>
        { isMenuShowing && <Top title={title} arrowBack={true}/> }
        { contents && 
        <ContentsContainer contents={contents} onClick={onClick} onDblClick={onDblClick} onScrollUp={onScrollUp} onScrollDown={onScrollDown}
        colorize={isColorActive} colorFormat={{subj:true, aux:true}}/>}
        { isMenuShowing && <Bottom isColorActive={isColorActive} onColorize={()=>{console.log("clicked");setIsColorActive((prev)=>!prev);}}/> }
    </div>);
}

export default Reader;