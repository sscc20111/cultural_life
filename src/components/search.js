import React, { useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { format, addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { fetchKopis } from '../js/api';
import { ServiceKey } from '../js/Option'

const SearchBox = () => {
    const [searchText, setSearchText] = useState('');
    const [KopisData, setKopisData] = useState([]);
    const navigate = useNavigate();

    const Search = () => {
        const today = new Date();
        const startDate = format(today, 'yyyyMMdd');
        const endDate = format(addDays(today, 30), 'yyyyMMdd'); // 오늘부터 10일 후
    
        fetchKopis(ServiceKey.KPOPS, 1, 12, startDate, endDate, '%20', '%20', searchText)
        .then(data => setKopisData(data))
        .catch(error => console.error('Error fetching data:', error));

        setSearchText('')
    }

    useEffect(()=>{
        navigate('', {
            state: {
                KopisData: KopisData
            }
        })
    },[KopisData])

    return(
        <InputGroup className='searchBox' >
            <Form.Control
            type="text"
            id="SerachText"
            value={searchText}
            onChange={(e)=> setSearchText(e.target.value)}>
            </Form.Control>
            <Button type="submit" value="Submit" variant="outline-light" onClick={()=>Search()}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
        </InputGroup>
    )

};

export default SearchBox