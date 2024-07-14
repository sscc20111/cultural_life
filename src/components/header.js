import React, { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { fetchSeoul } from '../js/api';
import { KopisOption } from '../js/Option'
import { Link } from 'react-router-dom';
import Navi from './navigation';

const MenuCategory = () => {

    return(
        <Stack className='headerNavi' direction="horizontal" gap={3} >
            <Button>뮤지컬</Button>
            <Button>콘서트</Button>
            <Button>전시/행사</Button>
            <Button>클래식/무용</Button>
            <Button>아동/가족</Button>
            <Button>연극</Button>
            <Button>축제</Button>
        </Stack>
    )
}

const SearchBox = () => {

    return(
        <InputGroup className='searchBox' >
            <Form.Control
            type="text"
            id="SerachText">
            </Form.Control>
            <Button type="submit" value="Submit" variant="outline-light"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
        </InputGroup>
    )

};

const Header = ({CateSelect}) => {

    return(
        <Container className='header'>
            <div className='headerMenu'>
                <h2 className='logo'><Link to='/'>LOGO</Link></h2>
                <SearchBox></SearchBox>
            </div>
            <Navi CateSelect={CateSelect}></Navi>
            {/* <Stack className='headerNavi' direction="horizontal" gap={3} >
                {KopisOption.map((item, index) => (
                    <Link key={index} to='Langking' onClick={(e)=>CateSelect(item.code)}>{item.name}</Link>
                ))}
            </Stack> */}
        </Container>
    )

};

export {Header};