import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

import { KopisOption } from '../js/Option'




const Navi = ({CateSelect}) => {

    return(
        <nav>
            {KopisOption.map((item, index) => (
                <button key={index} onClick={(e)=>CateSelect(item.code)}>{item.name}</button>
            ))}
        </nav>
    )
};

export default Navi