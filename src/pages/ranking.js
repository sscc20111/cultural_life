import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Container, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const LangkingPage = ({Item, CateCode}) => {
    const [TopLangk,setTopLangk] = useState([]);
    const [LowLangk,setLowLangk] = useState([]);
    const CodeIndex = Item.findIndex(item => item.code === CateCode);//받아온 code에 대응하는 배열로 변경

    const SliceLangk = () => {
        const sliceTopItem = Item[CodeIndex].data.slice(0,3)
        const sliceLowItem = Item[CodeIndex].data.slice(3)
        setTopLangk(sliceTopItem)
        setLowLangk(sliceLowItem)
    };

    useEffect(()=>{
        if(Item.length>0){
            SliceLangk()
        }
    },[Item,CateCode]);
    return(
        <Container className='RangkingPage'>
            <Stack direction="horizontal" className="content content01" >
                {Item.length > 0 ? (
                    TopLangk.map((item, index) => (
                        <Link key={index} className='contentBox' to="/Detail" state= {{DATA_ID:item.DATA_ID, DATA_LANK:index+1}}>
                            <div className='iconBox'>
                                <FontAwesomeIcon icon={faBookmark} />
                                <span>{index}</span>
                            </div>
                            <div className='imgBox'>
                                <img src={item.MAIN_IMG} alt={item.TITLE}></img>
                            </div>
                            <div className='textBox'>
                                <h4>{item.TITLE}</h4>
                                <p>{item.PLACE}<span>({item.AREA})</span></p>
                                <span>{item.DATE1}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </Stack>
            <div className='content content02'>
                <ul>
                    {Item.length > 0 ? (LowLangk.map((item, index) => (
                        <li key={index}>
                            <Link to="/Detail" state= {{DATA_ID:item.DATA_ID, DATA_LANK:index+4}}>
                                <div className='lankingBox'>
                                    <span>{index+4}</span>
                                </div>
                                <div className='descBox'>
                                    <div className='imgBox'>
                                        <img src={item.MAIN_IMG} alt={item.TITLE}></img>
                                    </div>
                                    <div className='textBox'>
                                        <h5>{item.TITLE}</h5>
                                        <p>{item.PLACE}</p>
                                        <p>{item.DATE1}</p>
                                        <span>test</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
                </ul>
            </div>
        </Container>
    )

};

export default LangkingPage