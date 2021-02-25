import React, {useState, useEffect, useRef} from 'react';
import ContentsContainer from './ContentsContainer.js';
import Dictionary from './Dictionary.js';
import cn from 'classnames';
import {CssBaseline, AppBar, Toolbar, Typography, Slide, useScrollTrigger, IconButton, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ColorIcon from '@material-ui/icons/FlashOn';
import SettingIcon from '@material-ui/icons/Settings';
import ExitIcon from '@material-ui/icons/ExitToApp';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import SettingDialog from './ReaderSettingDialog.js';
import firebase from 'firebase';


async function getData(bookId){
    const contentsRef = firebase.database().ref(`contents/${bookId}`)
    const contentsMetaRef = firebase.database().ref(`book-metas/${bookId}`)
    const contents = await contentsRef.once('value');
    const contentsMeta= await contentsMetaRef.once('value');

    // const contents = `<p><span class="sent" data-dif = "1"><span class="subj">It</span> <span class="verb">is</span> <span class="comp">a <span class="word">truth</span> universally acknowledged</span>, <span class="aux">that <span class="subj">a single man in <span class="word" data-mwe="in possesion of">possession</span> of a good fortune</span>, <span class="verb">must be</span> in want of a wife</span>.</span>
    // </p>
    // <p><span class="sent" data-dif = "1">However <span class="comp">little known</span> <span class="subj">the feelings or views of such a man</span> <span class="verb">may be</span> <span class="aux">on his first entering a neighbourhood</span>, <span class="subj">this truth</span> <span class="verb">is so well fixed in the minds of the surrounding families</span>, <span class="aux">that <span class="subj">he</span> <span class="verb">is considered</span> the rightful property of some one or other of their daughters</span>.</span>
    // </p>`;
    console.log(contentsMeta.val());
    console.log(contents.val());

    return {
      contentsMeta: contentsMeta.val(),
      contents: contents.val(),
    }
}

function Reader(props){
    const {history, match} = props;
    const [contents, setContents] = useState("<p></p>");
    const [contentsMeta, setContentsMeta] = useState({title:"", hasPrev:false, hasNext:false});
    const [isColorActive, setIsColorActive] = useState(false);
    const [colorFormat, setColorFormat] = useState({subj:true, verb:false, obj:false, comp:false, aux:true});
    const [textFormat, setTextFormat] = useState({font:"Times New Roman", fontSize:12, lineHeight:1.5});
    const [dictQuery, setDictQuery] = useState({word:"", mwe:"", sent:""});
    const [isDictOpen, setIsDictOpen] = useState(false);

    useEffect(()=>{
      const bookId = match.params.id;
      console.log(match);
      getData(bookId)
      .then((data)=>{
          setContentsMeta(data.contentsMeta);
          setContents(data.contents);
      });
    },[match]);

    function onDblClick(evt){
        evt.stopPropagation();
    }
    
    function onClick(evt){
        console.log(evt.target);
        if(evt.target.className == "word"){
            console.log("show dict");
            const query = {
              word: evt.target.innerText,
              mwe: evt.target.dataset.mwe?evt.target.dataset.mwe:"",
              sent: evt.target.closest(".sent").innerText,
              offset: 100,
              src:contentsMeta.title,
            }
            setDictQuery(query);
            setIsDictOpen(true);
        }
    }
    
    const classes = useStyles(textFormat);
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
                {/* <IconButton aria-label="" color={isColorActive?"primary":"default"} onClick={()=>setIsColorActive(prev=>!prev)}>
                  <ColorIcon />
                </IconButton> */}
                <Button startIcon={<ColorIcon />} className={classes.colorizeButton}variant="contained" color={isColorActive?"primary":"default"} onClick={()=>setIsColorActive(prev=>!prev)}>
                  Fast Read
                </Button>
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
        {<div className={classes.title}>{contentsMeta.title}</div>}
        { contents && 
        <ContentsContainer contents={contents} onClick={onClick} onDblClick={onDblClick} 
        colorize={isColorActive} colorFormat={colorFormat} textFormat={textFormat}/>}
        {isDictOpen && <Dictionary isDictOpen={isDictOpen} dictQuery={dictQuery} onClose={()=>{setIsDictOpen(false)}}/>}
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
    },
    colorizeButton:{
      width: '80px',
      borderRadius: '20px',
      lineHeight: 1.0,
      fontSize:'8pt',
    },
    title: (textFormat)=>({
      fontFamily: `${textFormat.font}`,
      fontSize: `${textFormat.fontSize *1.5}pt`,
      justifyContent: 'center',
      textAlign: 'center',
      paddingLeft:'2em',
      paddingRight:'2em',
      paddingTop: '2em',
      paddingBottom: '2em',
    }),
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