import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import LoadingImg from '../../assets/img/test.png'
import { Link } from 'react-router-dom';

const Content01 = ({ Item }) => {
    return (
        <div className='content content01'>
            {Array.from({ length: 9 }, (_, index) => (
                Item[index] ? (
                    <Link className='ItemBox' to="/Detail" state= {{DATA_ID:Item[index].data[0].DATA_ID, DATA_LANK:1}}  key={index} >

                        <div className='textBox'>
                            <h3>{Item[index].data[0].TITLE}</h3>
                            <p>{Item[index].data[0].DATE1}</p>
                            <p>{Item[index].data[0].PLACE}</p>
                        </div>
                        <div className='imgBox'>
                            <img src={Item[index].data[0].MAIN_IMG} alt={Item[index].data[0].TITLE}></img>
                        </div>
                    </Link>
                ):(
                    <div className='ItemBox' key={index}>
                        <div className='textBox'>
                            <h3>Loading</h3>
                        </div>
                        <div className='imgBox'>
                            <img src={LoadingImg} alt="Loading"></img>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};



export default Content01