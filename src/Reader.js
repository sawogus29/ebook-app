import React, {useState, useEffect, useRef} from 'react';
import ContentsContainer from './ContentsContainer.js';
import Dictionary from './Dictionary.js';
import cn from 'classnames';
import {CssBaseline, AppBar, Toolbar, Typography, Slide, useScrollTrigger, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ColorIcon from '@material-ui/icons/ColorLens';
import SettingIcon from '@material-ui/icons/Settings';
import ExitIcon from '@material-ui/icons/ExitToApp';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import SettingDialog from './ReaderSettingDialog.js';


async function getData(){
    const contents = `<p><span class="sent" data-dif = "2">In <span class="word" data-mwe="west berlin">West</span> Berlin in 1963, <span class="subj">President Kennedy</span> <span class="verb">delivered</span> <span class="obj">his most eloquent speech</span> on the world stage.</span>
    <span class="sent" data-dif = "2"><span class="subj">The director of the John F. Kennedy Presidential Library and Museum</span> <span class="verb">tells</span> <span class="obj">the evocative story behind JFK’s words</span>.</span>
    </p>
    <p><span class="sent" data-dif = "2"><span class="word">other</span> than ask not, <span class="subj">they</span> <span class="verb">were</span> <span class="obj">the most-famous words he ever spoke</span>.</span>
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

function Reader(props){
    const {history} = props;
    const [title, setTitle] = useState("title");
    const [contents, setContents] = useState("<p></p>");
    const [contentsMeta, setContentsMeta] = useState({hasPrev:false, hasNext:false});
    const [isColorActive, setIsColorActive] = useState(false);
    const [colorFormat, setColorFormat] = useState({subj:true, verb:false, obj:false, comp:false, aux:true});
    const [textFormat, setTextFormat] = useState({font:"Times New Roman", fontSize:12, lineHeight:1.5});
    const [dictWord, setDictWord] = useState(null);

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
        console.log(evt.target);
        if(evt.target.className == "word"){
            console.log("show dict");
            let word = evt.target.dataset.mwe? evt.target.dataset.mwe : evt.target.innerText;
            setDictWord(word);
        }
    }
    
    const classes = useStyles();
    const [isSettingOpen, setIsSettingOpen] = React.useState(false);
    function onSettingClose(_colorFormat, _textFormat){
      setIsSettingOpen(false);
      setColorFormat(_colorFormat);
      setTextFormat(_textFormat);
    }

    return (<React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
            <AppBar positon='fixed' color="default" className={cn(classes.root)}>
            <Toolbar className={cn(classes.toolbar)}>
                <IconButton aria-label="" onClick={()=>console.log()} disabled={!contentsMeta.hasPrev}>
                  <PrevIcon />
                </IconButton>
                <IconButton aria-label="" onClick={()=>console.log()} disabled={!contentsMeta.hasNext}>
                  <NextIcon />
                </IconButton>
                <IconButton aria-label="" color={isColorActive?"primary":"default"} onClick={()=>setIsColorActive(prev=>!prev)}>
                  <ColorIcon />
                </IconButton>
                <IconButton aria-label="" onClick={()=>{setIsSettingOpen(true)}}>
                  <SettingIcon />
                </IconButton>
                <IconButton aria-label="" onClick={()=>{history.goBack();}}>
                  <ExitIcon />
                </IconButton>
                {/* <Typography variant="h6">Scroll to Hide App Bar</Typography> */}
            </Toolbar>
            </AppBar>
        </HideOnScroll>
        
        { contents && 
        <ContentsContainer contents={contents} onClick={onClick} onDblClick={onDblClick} 
        colorize={isColorActive} colorFormat={colorFormat} textFormat={textFormat}/>}
        {<Dictionary word={dictWord} onClose={()=>setDictWord(null)}/>}
        {<SettingDialog open={isSettingOpen} onClose={onSettingClose} 
        colorFormat={colorFormat} textFormat={textFormat}/>}


    </React.Fragment>);
}


const useStyles = makeStyles({
    root:{
      top: 'auto',
      bottom: 0,
    },
    toolbar:{
        display:'flex',
        justifyContent:"space-between",
    }
});

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="up" in={!trigger}>
        {children}
      </Slide>
    );
}

export default Reader;