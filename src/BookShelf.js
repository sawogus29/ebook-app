import React from 'react';
import {Link} from 'react-router-dom';

function BookShelf(){
    return (<div>
        BookShelf
        <Link to="/reader">책1</Link>

    </div>);
}

export default BookShelf;