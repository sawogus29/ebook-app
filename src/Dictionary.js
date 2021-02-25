import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import firebase from 'firebase';
import axios from 'axios';

async function getMeaning(word){
  /* [{meanings, phonetic, word}] */
  console.log(word);
  const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  console.log(res.data);
  const resWord = res.data[0].word;
  const resMeaning = res.data[0].meanings[0].definitions[0].definition;
  return {resWord, resMeaning};
}

function saveWord(data){
  console.log(data);
  const {word, meaning, sent, offset, src} = data;
  const userId = "jaehyeon";
  const wordRef = firebase.database().ref(`users/${userId}/words/`);

  if(userId.length == 0){ return; }

  wordRef.child(word).set({
    word: word,
    meaning: meaning,
    sents: [{sent:sent, offset:offset, src:src}],
    time: firebase.firestore.Timestamp.now().seconds
  });
  console.log(word +' saved');
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dictionary({isDictOpen, dictQuery, onClose}) {
  const [word, setWord] = useState(dictQuery.word);
  const [meaning, setMeaning] = useState("searching...");

  const handleClose = () => {
    onClose();
    // setOpen(false);
  };
    
  useEffect(() => {
    function onSuccess(data){
      const {resWord, resMeaning} = data;
      setWord(resWord);
      setMeaning(resMeaning);
      saveWord({
        ...dictQuery,
        word:resWord, 
        meaning:resMeaning, 
      });
    }

    function searchWord(){
      dictQuery.word &&
      getMeaning(dictQuery.word)
      .then(onSuccess)
      .catch(()=>{
        setMeaning("request failed");
      });
    }

    if(dictQuery.mwe){
      getMeaning(dictQuery.mwe)
      .then(onSuccess)
      .catch((err)=>{
        console.log({mew: dictQuery.mwe, err});
        searchWord();
      });
    }else{
      searchWord();
    }
  },[dictQuery]);

  return (
  <Dialog
    open={isDictOpen}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">
        {word}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        {meaning}
      </DialogContentText>
    </DialogContent>
  </Dialog>
  );
}
