import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import { Link } from 'react-router-dom';

const LangkingPage = ({Item, CateCode}) => {
    // const [CateCode,setCateCode] = useState('AAAA');
    // const CateSelect = (Cate) => {//상위 component_navi에서 선택한 카테고리 코드 받아옴
    //     setCateCode(Cate)
    // };
    const [TopLangk,setTopLangk] = useState([]);
    const [LowLangk,setLowLangk] = useState([]);
    const CodeIndex = Item.findIndex(item => item.code === CateCode);//받아온 code에 대응하는 배열로 변경

    const SliceLangk = () => {
        // console.log('test');
        const sliceTopItem = Item[CodeIndex].data.slice(0,3)
        const sliceLowItem = Item[CodeIndex].data.slice(3)
        setTopLangk(sliceTopItem)
        setLowLangk(sliceLowItem)
    };

    useEffect(()=>{
        // console.log(Item);
        if(Item.length>0){
            SliceLangk()
        }
    },[Item]);
    useEffect(()=>{
        // console.log(CateCode);
        if(Item.length>0){
            SliceLangk()
        }
    },[CateCode]);
    // useEffect(()=>{
    //     console.log(TopLangk);
    //     console.log(LowLangk);
    // },[TopLangk]);
    return(
        <Swiper slidesPerView={3} spaceBetween={30} freeMode={true} pagination={{ clickable: true, }} modules={[FreeMode, Pagination]} className="mySwiper" >
            {Item.length > 0 ? (
                TopLangk.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link className='ItemWrap' to="/Detail" state= {item.DATA_ID} onClick={()=>console.log(item.DATA_ID)}>
                            <div className='imgBox'>
                                <img src={item.MAIN_IMG} alt={item.TITLE}></img>
                            </div>
                            <div className='desc'>
                                <h4>{item.TITLE}</h4>
                                <p>{item.PLACE}<span>({item.AREA})</span></p>
                                <span>{item.DATE1}~{item.DATE2}</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))
            ) : (
                <SwiperSlide>
                    <div>Loading...</div>
                </SwiperSlide>
            )}
            <div className='contentBox'>
                <ul>
                    {Item.length > 0 ? (LowLangk.map((item, index) => (
                        <li key={index}>{item.TITLE}</li>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
                </ul>
            </div>
        </Swiper>
    )

};

export default LangkingPage