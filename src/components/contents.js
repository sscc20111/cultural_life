import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Navi from './navigation'
import LoadingImg from '../assets/img/test.png'

const Content1 = ({ Item }) => {

    return (
        <div className='contents content01'>
            {Array.from({ length: 9 }, (_, index) => (
                Item[index] ? (
                    <div className='contentBox' key={index}>
                        <div className='textBox'>
                            <h3>{Item[index].data[0].TITLE}</h3>
                            <p>{Item[index].data[0].DATE1}</p>
                            <p>{Item[index].data[0].PLACE}</p>
                        </div>
                        <div className='imgBox'>
                            <img src={Item[index].data[0].MAIN_IMG} alt={Item[index].data[0].TITLE}></img>
                        </div>
                    </div>
                ):(
                    <div className='contentBox' key={index}>
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

const Content2 = ({ Item }) => {
    const [CateCode,setCateCode] = useState('AAAA');
    const CateSelect = (Cate) => {//상위 component_navi에서 선택한 카테고리 코드 받아옴
        setCateCode(Cate)
    };
    const CodeIndex = Item.findIndex(item => item.code === CateCode);//받아온 code에 대응하는 배열로 변경

    return (
        <div className='contents content02'>
            <h3>장르별 랭킹</h3>
            <Navi CateSelect={CateSelect}></Navi>

            <Swiper slidesPerView={5} spaceBetween={30} freeMode={true} pagination={{ clickable: true, }} modules={[FreeMode, Pagination]} className="mySwiper" >
                {Item.length > 0 ? (
                    Item[CodeIndex].data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='ItemWrap'>
                                <div className='imgBox'>
                                    <img src={item.MAIN_IMG} alt={item.TITLE}></img>
                                </div>
                                <div className='desc'>
                                    <h4>{item.TITLE}</h4>
                                    <p>{item.PLACE}<span>({item.AREA})</span></p>
                                    <span>{item.DATE1}~{item.DATE2}</span>
                                </div>
                            </div>
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

const Content3 = ({ Item }) => {

    return(
        <div className='contents content03'>
            <h3>다가오는 축제</h3>
            <Swiper slidesPerView={5} spaceBetween={30} freeMode={true} pagination={{ clickable: true, }} modules={[FreeMode, Pagination]} className="mySwiper" >
                {Item.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='ItemWrap'>
                            <div className='imgBox'>
                                <img src={item.MAIN_IMG} alt={item.TITLE}></img>
                            </div>
                            <div className='desc'>
                                <h4>{item.TITLE}</h4>
                                <p>{item.PLACE}</p>
                                <span>{item.DATE1}~{item.DATE2}</span>
                                <span>({item.CODENAME})</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )

};

export { Content1, Content2, Content3 }
