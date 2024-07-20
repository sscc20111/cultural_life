import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';


const ListPage = () => {
    const location = useLocation();
    const KopisData = location.state.KopisData || {};

    return (
        <Container className='ListPage'>
            <ul>
                {(Array.isArray(KopisData)) ? (
                    KopisData.map((item, index) => (
                        <li className='listItem' key={index}>
                            <Link to="/Detail" state= {{DATA_ID:item.DATA_ID, DATA_LANK:'0'}}>
                                <div className='imgBox'>
                                    <img src={item.MAIN_IMG}></img>
                                </div>
                                <div className='textBox'>
                                    <h4><span>({item.CODENAME})</span> {item.TITLE}</h4>
                                    <p>{item.PLACE}</p>
                                    <span>{item.DATE1}~</span>
                                    <span>{item.DATE2}</span>
                                </div>
                            </Link>
                        </li>
                    ))
                ):(
                    <li className='listItem'>
                            <Link to="/Detail" state= {{DATA_ID:KopisData.DATA_ID, DATA_LANK:'0'}}>
                                <div className='imgBox'>
                                    <img src={KopisData.MAIN_IMG}></img>
                                </div>
                                <div className='textBox'>
                                    <h4><span>({KopisData.CODENAME})</span> {KopisData.TITLE}</h4>
                                    <p>{KopisData.PLACE}</p>
                                    <span>{KopisData.DATE1}~</span>
                                    <span>{KopisData.DATE2}</span>
                                </div>
                            </Link>
                    </li>
                )}
            </ul>
        </Container>
    )
};

export default ListPage