import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ServiceKey } from '../js/Option'
import { fetchDetail } from '../js/api';
import { Container } from 'react-bootstrap';

const DetailPage = ({}) => {
    const location = useLocation();
    const DATA_ID = location.state || {};
    const [DetailItem,setDetailItem] = useState([]);

    const DetailResponse = () => {//kopis에 축제정보 요청
        fetchDetail(ServiceKey.KPOPS, DATA_ID)
        .then(data => setDetailItem(data))
        .catch(error => console.error('Error fetching data:', error));
    };
    
    useEffect(()=>{
        DetailResponse();
    },[]);

    return(
        <Container className='DetailPage'>
            DetailPage test{DATA_ID}
            <div>{DetailItem.TITLE}</div>
            <div>{DetailItem.DATE1}</div>
            <div>{DetailItem.DATE2}</div>
            <div>{DetailItem.PLACE}</div>
            <div>{DetailItem.CAST}</div>
            <div>{DetailItem.CREW}</div>
            <div>{DetailItem.RUN_TIME}</div>
            <div>{DetailItem.AGE}</div>
            <div>{DetailItem.PRODUCER_COMPANY}</div>
            <div>{DetailItem.PRODUCER}</div>
            <div>{DetailItem.PRICE}</div>
            <div>{DetailItem.MAIN_IMG}</div>
            <div>{DetailItem.CODENAME}</div>
            <div>{DetailItem.STATUS}</div>
            {/* <div>{DetailItem.INTRODUCE_IMG}</div> */}
            <div>{DetailItem.DETAIL_TIME}</div>
            {/* <div>{DetailItem.TIKET}</div> */}
        </Container>
    )

};

export default DetailPage