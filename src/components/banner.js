import React, { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import ColorThief from 'colorthief';

export const Banner = ({ BannerItem }) => {
    // const imgRefs = useRef([]);

    // const handleImageLoad = (index) => {
    //     const img = imgRefs.current[index];
    //     if (img) {
    //         const colorThief = new ColorThief();
    //         const dominantColor = colorThief.getColor(img);
    //         console.log(`Dominant color of image ${index}:`, dominantColor);
    //     }
    // };

    return (
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
                        <SwiperSlide className='SliderWrap' key={index}>
                            <div className='desc'>
                                <h4>{data.TITLE}<span>({data.CODENAME})</span></h4>
                                <p className='USE_TRGT'>이용대상<span>({data.USE_TRGT})</span></p>
                                <p className='PLACE'>{data.PLACE}</p>
                                <span className='DATE'>{data.DATE}</span>
                            </div>
                            <div className='imgBox'>
                                <img
                                    // ref={(el) => (imgRefs.current[index] = el)}
                                    src={data.MAIN_IMG}
                                    alt={data.TITLE}
                                    // onLoad={() => handleImageLoad(index)}
                                    // crossOrigin="anonymous"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </div>
    );
};
