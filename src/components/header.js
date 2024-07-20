import React, { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';


import { Link } from 'react-router-dom';
import Navi from './navigation';
import SearchBox from './search';


const Header = ({CateSelect}) => {

    return(
        <Container className='header'>
            <div className='headerMenu'>
                <h2 className='logo'><Link to='/'>LOGO</Link></h2>
                <SearchBox></SearchBox>
            </div>
            <Navi CateSelect={CateSelect}></Navi>
        </Container>
    )

};

export {Header};