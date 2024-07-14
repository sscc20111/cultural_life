import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

import { KopisOption } from '../js/Option'
import { Link } from 'react-router-dom';




const Navi = ({CateSelect}) => {

    return(
        <nav>
            {KopisOption.map((item, index) => (
                <Link className='navBtn' key={index} to='Langking' onClick={(e)=>CateSelect(item.code)}>{item.name}</Link>
            ))}
        </nav>
    )
};

export default Navi