import React, { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
// import Color from 'color-thief-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Category = () => {

    

};

export const Banner = ({BannerItem}) => {
    const Loading = () => <div>Loading...</div>;

    return(
        <div className='banner'>
            <Container className='h-100'>
                <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    spaceBetween={30}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    {BannerItem.map((data, index) => (
                        <SwiperSlide className='SliderWrap'key={index}>
                            <div className='desc'>
                                <h4>{data.TITLE}<span>({data.CODENAME})</span></h4>
                                <p className='USE_TRGT'>이용대상<span>({data.USE_TRGT})</span></p>
                                {/* <p className='USE_FEE'>이용요금<span>({data.USE_FEE})</span></p> */}
                                <p className='PLACE'>{data.PLACE}</p>
                                <span className='DATE'>{data.DATE}</span>
                            </div>
                            <div className='imgBox'>{data.MAIN_IMG}
                                <img src={data.MAIN_IMG} alt={data.TITLE}></img>
                            </div>
                            {/* <Color src={data.MAIN_IMG} crossOrigin="anonymous" format="hex">
                            {({ data, loading }) => {
                                if (loading) return <Loading />;
                                // setTimeout(() => {
                                    
                                    return (
                                        <div style={{ color: data}}>
                                        Predominant color: <strong>{data}</strong>
                                        </div>
                                    );
                                // }, 100);
                                }}
                            </Color> */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </div>
    )

};

