import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { format, addDays } from 'date-fns';

import { fetchSeoul, fetchKopis } from './js/api'; // api.js에서 fetchSeoul 함수를 가져옵니다.
import { SeoulOption, ServiceKey } from './js/Option'

import { Header } from './components/header'
import { Banner } from './components/banner'

import './App.css';
import './style.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [SeoulData, setSeoulData] = useState([]);
  const [KopisData, setKopisData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('%20');
  const form = useRef();
  const [swiperRef, setSwiperRef] = useState(null);

  const [BannerItem,setBannerItem] = useState([]);
  

  const bannerData = async () => {
    for (const options of SeoulOption) {
      try {
        const data = await fetchSeoul(options, searchText, 1);
        if (data.length > 0) {
          setBannerItem(prevData => [...prevData, ...data]);
        } else {
          setBannerItem(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  const SeoulDataFetch = () => {
    fetchSeoul(selectedOption, searchText, 10)
    .then(data => setSeoulData(data))
    .catch(error => console.error('Error fetching data:', error));
  };

  const KopisDataFetch = () => {
    const today = new Date();
    const startDate = format(today, 'yyyyMMdd');
    const endDate = format(addDays(today, 10), 'yyyyMMdd'); // 오늘부터 10일 후
    const encodedTitle = encodeURIComponent('젊은연극제');
    fetchKopis(ServiceKey.KPOPS, 4, startDate, endDate, '%20', '%20', encodedTitle)////////////////////숫자는 되는데 한글이 안됨 (아마 영어도 될듯?)
    .then(data => setKopisData(data))
    .catch(error => console.error('Error fetching data:', error));
  };

  const Search = (e) => {
    e.preventDefault();
    SeoulDataFetch()
  };

  useEffect(() => {
    bannerData();
    SeoulDataFetch()
    KopisDataFetch()
  }, []);
      useEffect(()=>{
          console.log(KopisData);
          // console.log(KopisData.elements);
      },[KopisData]);


  return (
    <div className='Wraper'>
      <Header></Header>
      <Banner BannerItem={BannerItem}></Banner>

      <div className='seoulWrap'>
        <form ref={form}>
          <select name="option" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            {SeoulOption.map((option) => (
              <option value={option} key={option}>{option === '%20' ? '분류' : option}</option>
            ))}
          </select>
          <input value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
          <button onClick={Search}>검색</button>
        </form>

        <div className='viewItem'>
          <Swiper
            slidesPerView={5}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
          {SeoulData.map((data, index) => (
              <SwiperSlide className='ItemWrap'key={index}>
                <div className='imgBox'>
                  <img src={data.MAIN_IMG} alt={data.TITLE}></img>
                </div>
                <div className='desc'>
                  <h4>{data.TITLE}<span>({data.CODENAME})</span></h4>
                  <p>{data.PLACE}<span>({data.GUNAME})</span></p>
                  <span>{data.DATE}</span>
                </div>
              </SwiperSlide>
          ))}
          </Swiper>
        </div>
        <div className='viewItem'>
          <Swiper
            slidesPerView={5}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
          {KopisData.map((data, index) => (
              <SwiperSlide className='ItemWrap'key={index}>
                <div className='imgBox'>
                  <img src={data.MAIN_IMG} alt={data.TITLE}></img>
                </div>
                <div className='desc'>
                  <h4>{data.TITLE}<span>({data.CODENAME})</span></h4>
                  <p>{data.PLACE}<span>({data.GUNAME})</span></p>
                  <span>{data.DATE1}~{data.DATE2}</span>
                </div>
              </SwiperSlide>
          ))}
          </Swiper>
        </div>
        
      </div>
    </div>
  );
}

export default App;