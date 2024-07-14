import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';


const Content03 = ({ Item }) => {

    return(
        <div className='content content03'>
            <h3>다가오는 축제</h3>
            <Swiper slidesPerView={5} spaceBetween={30} freeMode={true} pagination={{ clickable: true, }} modules={[FreeMode, Pagination]} className="mySwiper" >
                {Item.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link className='ItemBox' to="/Detail" state= {item.DATA_ID}>
                            <div className='imgBox'>
                                <img src={item.MAIN_IMG} alt={item.TITLE}></img>
                            </div>
                            <div className='textBox'>
                                <h4>{item.TITLE}</h4>
                                <p>{item.PLACE}</p>
                                <span>{item.DATE1}~{item.DATE2}</span>
                                <span>({item.CODENAME})</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )

};

export default Content03
