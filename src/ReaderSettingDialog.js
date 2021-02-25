import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import {FormGroup, FormControlLabel, Checkbox, DialogContent, FormControl, FormHelperText, FormLabel, 
  MenuItem, InputLabel, Select, DialogActions} from '@material-ui/core';
import cn from 'classnames';

const useStyles = makeStyles((theme)=>({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
    minWidth: 120,
  },
  subj: {backgroundColor:"pink",},
  verb: {backgroundColor:"yellow"},
  obj: {backgroundColor:"lightgreen"},
  comp: {backgroundColor:"lightblue"},
  aux: {
    color: "#555555",
    borderRadius:"1em",
    paddingLeft:"1px",
    paddingRight:"1px",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
  },
}));

function SimpleDialog(props) {
    const classes = useStyles();
    const { open, onClose, colorFormat, textFormat } = props;
    const [ colorChecks, setColorChecks ] = useState(colorFormat);
    const [ textSelects, setTextSelects ] = useState(textFormat);

    const textFormatRanges = {
      font: ["Times New Roman", "Helvetica"],
      fontSize: [10, 12, 14, 16, 18, 20],
      lineHeight: [1, 1.5, 2, 2.5, 3],
    }

    function handleClose(confirm=false) {
      console.log("here is handleClose");
      if(confirm){
        onClose(colorChecks, textSelects);
      }
    };
    // console.log(colorChecks);
    
    const handleChange = () => {
      console.log("changed");
    }

    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle>문장구조분석</DialogTitle>
        <DialogContent>
          <FormGroup row>
            {Object.keys(colorChecks).map((key, i)=>{
              return <FormControlLabel
                key={i}
                control={<Checkbox 
                  checked={colorChecks[key]} 
                  onChange={evt=>setColorChecks(
                    prev=>{ 
                      return {...prev, [key]:evt.target.checked}; 
                    }
                  )}
                  name={key} 
                  />}
                label={key}
              />;
            })}
          </FormGroup>
        </DialogContent>
        <DialogTitle>서식</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id="setting-font-label">글꼴</InputLabel>
            <Select
              labelId="setting-font-label"
              id="setting-font"
              value={textSelects.font}
              onChange={(evt)=>{setTextSelects((prev)=>({...prev,font:evt.target.value}))}}
            >
              {textFormatRanges.font.map((item, i)=>{
                return <MenuItem key={i} value={item}>{item}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="setting-fontSize-label">글자크기</InputLabel>
            <Select
              labelId="setting-fontSize-label"
              id="setting-fontSize"
              value={textSelects.fontSize}
              onChange={(evt)=>{setTextSelects((prev)=>({...prev,fontSize:evt.target.value}))}}
            >
              {textFormatRanges.fontSize.map((item, i)=>{
                return <MenuItem key={i} value={item}>{item}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="setting-lineHeight-label">줄간격</InputLabel>
            <Select
              labelId="setting-lineHeight-label"
              id="setting-lineHeight"
              value={textSelects.lineHeight}
              onChange={(evt)=>{setTextSelects((prev)=>({...prev,lineHeight:evt.target.value}))}}
            >
              {textFormatRanges.lineHeight.map((item, i)=>{
                return <MenuItem key={i} value={item}>{item}</MenuItem>
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>(handleClose(true))}>확인</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    );
}

export default SimpleDialog;