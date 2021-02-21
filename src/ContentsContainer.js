import React, {useState, useEffect, useRef} from 'react';
import './ContentsContainer.css';

function ContentsContainer({
    contents, onClick, onDblClick, 
    colorize=true, colorFormat,
    }){
    const timeoutRef = useRef();
    const isFirstTapRef = useRef();
    const isMovedRef = useRef();
    
    function onTouchStart(evt){
        console.log("onTouchStart");
        // Double Tap Detection
        window.clearTimeout(timeoutRef.current);
    }
    
    function onTouchMove(evt){
        // Double Tap Detection
        window.clearTimeout(timeoutRef.current);
        isMovedRef.current = true;
    }
    
    function onTouchEnd(evt){
        console.log("onTouchEnd");
        // Double Tap Detection
        if(isMovedRef.current){isMovedRef.current=false; isFirstTapRef.current=true; return;}

        if(isFirstTapRef.current){
          timeoutRef.current = window.setTimeout(function(){
            onClick(evt);
            isFirstTapRef.current = true;
          }, 250);
          isFirstTapRef.current = false;
        }else{
          onDblClick(evt);
          isFirstTapRef.current = true;
        }
    }
    const colorReaderRef = useRef();
    useEffect(()=>{
        for(let span in colorFormat){
            if (colorFormat[span]){
                colorReaderRef.current.dataset[span] = 1;
            }else{
                delete colorReaderRef.current.dataset[span];
            }
        }

        const sents = colorReaderRef.current.querySelectorAll(".sent");
        if(colorize){
            for(let s of sents){
                s.dataset['color'] = true;
            }
        }else{
            for(let s of sents){
                delete s.dataset['color'];
            }
        }
    },[colorReaderRef, colorize, colorFormat]);
    
    return (<div>
        <div ref={colorReaderRef} className="color-reader"
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} 
        dangerouslySetInnerHTML={{__html: contents}}></div> 
    </div>);
}

export default ContentsContainer;