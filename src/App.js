import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import { fetchSeoul } from './js/api'; // api.js에서 fetchSeoul 함수를 가져옵니다.
import { SeoulOption } from './js/Option'

import './App.css';
import './style.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function App() {
  const [SeoulData, setSeoulData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('%20');
  const form = useRef();
  const [swiperRef, setSwiperRef] = useState(null);
  

  useEffect(() => {
    fetchSeoul(selectedOption, searchText)
      .then(data => setSeoulData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const Search = (e) => {
    e.preventDefault();
    fetchSeoul(selectedOption, searchText)
      .then(data => setSeoulData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
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
          onSwiper={setSwiperRef}
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
    </div>
  );
}

export default App;