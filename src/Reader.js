import React, {useState, useEffect, useRef} from 'react';
import './Reader.css';

function Reader(){
    const contents = `<p><span class="sent" data-dif = "2">In West Berlin in 1963, <span class="subj">President Kennedy</span> <span class="verb">delivered</span> <span class="obj">his most eloquent speech</span> on the world stage.</span>
    <span class="sent" data-dif = "2"><span class="subj">The director of the John F. Kennedy Presidential Library and Museum</span> <span class="verb">tells</span> <span class="obj">the evocative story behind JFK’s words</span>.</span>
    </p>
    <p><span class="sent" data-dif = "2">other than ask not, <span class="subj">they</span> <span class="verb">were</span> <span class="obj">the most-famous words he ever spoke</span>.</span>
    <span class="sent" data-dif = "2"><span class="subj">They</span> <span class="verb">drew</span> <span class="obj">the world’s attention</span> to what he considered the hottest spot in the Cold War.</span>
    <span class="sent" data-dif = "1">Added at the last moment and scribbled in his own hand, <span class="obj">they</span> <span class="verb">were not</span>, like the oratory in most of his other addresses, <span class="verb">chosen</span> by talented speechwriters.</span>
    <span class="sent" data-dif = "1">And for a man notoriously tongue-tied when it came to foreign languages, <span class="subj">the four words</span> <span class="verb">weren't</span> even in English.</span>
    </p>`;
    const [isMenuShowing, setIsMenuShowing] = useState(true);
    const lastYRef = useRef();
    const timeoutRef = useRef();
    const isFirstTapRef = useRef();
    const isMovedRef = useRef();
    
    function onTouchStart(evt){
        console.log("onTouchStart");
        // Scroll Detection
        lastYRef.current = evt.touches[0].screenY;
        // Double Tap Detection
        window.clearTimeout(timeoutRef.current);
    }
    
    function onTouchMove(evt){
        // console.log("onTouchMove");
        // Scroll Detection
        if (lastYRef.current - evt.touches[0].screenY < 0){
            console.log("scroll up");
            if (isMenuShowing === false){
                setIsMenuShowing(true);
            }
        }else{
            console.log("scroll down");
            if (isMenuShowing){
                setIsMenuShowing(false);
            }
        }
        lastYRef.current = evt.touches[0].screenY;
        // Double Tap Detection
        window.clearTimeout(timeoutRef.current);
        isMovedRef.current = true;
    }
    
    function onTouchEnd(evt){
        console.log("onTouchEnd");
        // Scroll Detection
        lastYRef.current = null;
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

    function onDblClick(evt){
        console.log("onDblClick");
        console.log(evt);
        evt.stopPropagation();
    }
    
    function onClick(evt){
        console.log("onClick");
        console.log(evt);
    }
    
    return (<div>
        { isMenuShowing && <Top /> }
        { contents && <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} dangerouslySetInnerHTML={{__html: contents}}></div> }
        { isMenuShowing && <Bottom /> }
    </div>);
}

function Top(){
    return (<div>Top</div>);
}

function Bottom() {
    return (<div>Bottom</div>);
}

export default Reader;