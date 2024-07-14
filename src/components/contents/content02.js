import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { KopisOption } from '../../js/Option'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Content02 = ({ Item }) => {
    const [CateCode,setCateCode] = useState('AAAA');
    const CateSelect = (Cate) => {//상위 component_navi에서 선택한 카테고리 코드 받아옴
        setCateCode(Cate)
    };
    const CodeIndex = Item.findIndex(item => item.code === CateCode);//받아온 code에 대응하는 배열로 변경

    return (
        <div className='content content02'>
            <h3>장르별 랭킹</h3>
            <nav>
                {KopisOption.map((item, index) => (
                    <button className={item.code == CateCode ? ('active'):('')} key={index} onClick={(e)=>CateSelect(item.code)}>{item.name}</button>
                ))}
            </nav>

            <Swiper slidesPerView={5} spaceBetween={30} freeMode={true} pagination={{ clickable: true, }} modules={[FreeMode, Pagination]} className="mySwiper" >
                {Item.length > 0 ? (
                    Item[CodeIndex].data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Link className='ItemBox' to="/Detail" state= {item.DATA_ID}>
                                <div className='imgBox'>
                                    <img src={item.MAIN_IMG} alt={item.TITLE}></img>
                                </div>
                                <div className='textBox'>
                                    <h4>{item.TITLE}</h4>
                                    <p>{item.PLACE}<span>({item.AREA})</span></p>
                                    <span>{item.DATE1}</span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div>Loading...</div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};


export default Content02
