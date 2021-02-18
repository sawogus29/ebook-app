import React, {useState, useEffect, useRef} from 'react';
import style from './Bottom.module.css';
import IconButton from '@material-ui/core/IconButton';
import FormatColorFill from '@material-ui/icons/FormatColorFill';
import cn from 'classnames';

function Bottom({isColorActive, onColorize}) {
    return (<div className={cn(style.bottom)}>
        <Button active={isColorActive} onClick={onColorize}/>
        {/* <Button onClick={()=>console.log("hi")}/> */}
    </div>);
}

function Button({active, onClick}){
    function _onClick(){
        onClick();
    }
    
    return (<>
        {/* <IconButton disabled={!isPressed} color="primary" aria-label="upload picture" component="span" onClick={_onClick}> */}
        <IconButton color={active?"primary":"default"} aria-label="upload picture" component="span" onClick={_onClick}>
          <FormatColorFill />
        </IconButton>
    </>);
    
}

export default Bottom;
