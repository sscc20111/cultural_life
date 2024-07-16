import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ServiceKey } from '../js/Option'
import { fetchDetail } from '../js/api';
import { Container } from 'react-bootstrap';

const DetailPage = ({}) => {
    const location = useLocation();
    const ID = location.state.DATA_ID || {};
    const LANK = location.state.DATA_LANK || {};
    const [DetailItem,setDetailItem] = useState([]);

    const DetailResponse = () => {//kopis에 축제정보 요청
        fetchDetail(ServiceKey.KPOPS, ID)
        .then(data => setDetailItem(data))
        .catch(error => console.error('Error fetching data:', error));
    };
    
    useEffect(()=>{
        DetailResponse();
    },[]);
    useEffect(()=>{
        // console.log(DetailItem.INTRODUCE_IMG._text);
    },[DetailItem]);

    return(
        <Container className='DetailPage'>
            <div className='productWrapper'>
                <div className='productMain'>
                    <div className='productMainHeader'>
                        <div className='summary'>
                            <div className='summaryHeader'>
                                <h3>{DetailItem.TITLE}</h3>
                                <span>{DetailItem.CODENAME} 월간 {LANK}위</span>
                            </div>
                            <div className='summaryBody'>
                                <div className='imgBox'>
                                    <img src={DetailItem.MAIN_IMG}></img>
                                </div>
                                <ul className='textBox'>
                                    <li className='info'>
                                        <span>장소</span>
                                        <p>{DetailItem.PLACE}</p>
                                    </li>
                                    <li className='info'>
                                        <span>공연기간</span>
                                        <p>{DetailItem.DATE1}~{DetailItem.DATE2}</p>
                                    </li>
                                    <li className='info'>
                                        <span>공연시간</span>
                                        <p>{DetailItem.DETAIL_TIME}</p>
                                    </li>
                                    <li className='info'>
                                        <span>런타임</span>
                                        <p>{DetailItem.RUN_TIME}</p>
                                    </li>
                                    <li className='info'>
                                        <span>관람연령</span>
                                        <p>{DetailItem.AGE}</p>
                                    </li>
                                    <li className='info'>
                                        <span>가격</span>
                                        <p>{DetailItem.PRICE}</p>
                                    </li>
                                    <li className='info'>
                                        <span>공연상태</span>
                                        <p>{DetailItem.STATUS}</p>
                                    </li>
                                    <li className='info'>
                                        <span>출연진</span>
                                        <p>{DetailItem.CAST}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='productMainBody'>
                        {DetailItem ? (
                            Array.isArray(DetailItem.INTRODUCE_IMG) ? (// INTRODUCE_IMG가 배열인 경우
                                DetailItem.INTRODUCE_IMG.map((item, index) => (
                                    item && item._text ? (
                                        <img key={index} src={item._text} alt={`img-${index}`} />
                                    ) : null
                                ))
                            ) : (
                                DetailItem.INTRODUCE_IMG && DetailItem.INTRODUCE_IMG._text ? (// INTRODUCE_IMG가 객체인 경우
                                    <img src={DetailItem.INTRODUCE_IMG._text} alt="img-single" />
                                ) : null
                            )
                        ) : (// DetailItem이 없는 경우
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
                <div className='productSide'>
                    <div className='calendar'>calendar</div>
                    {/* <div>{DetailItem.TIKET}</div> */}
                </div>
            </div>





        </Container>
    )

};

export default DetailPage