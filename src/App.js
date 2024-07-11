import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { format, addDays } from 'date-fns';

import { fetchSeoul, fetchKopis, fetchRanking, fetchFestival } from './js/api'; // api.js에서 fetchSeoul 함수를 가져옵니다.
import { SeoulOption, KopisOption, ServiceKey } from './js/Option'

import { Header } from './components/header'
import { Banner } from './components/banner'
import { Content1, Content2, Content3 } from './components/contents'
import { LangkingPage } from './components/sidepage'

import './App.css';
import './style.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [SeoulData, setSeoulData] = useState([]);
  // const [KopisData, setKopisData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchText2, setSearchText2] = useState('%20');
  const [selectedOption, setSelectedOption] = useState('%20');
  // const form = useRef();
  // const form2 = useRef();

  const [BannerItem,setBannerItem] = useState([]);
  const [RankingItem,setRankingItem] = useState([]);
  const [ContentsRankingItem,setContentsRankingItem] = useState([]);
  const [FestivalItem,setFestivalItem] = useState([]);
  

  const bannerData = async () => { //openapi.seoul에 카테고리별 이미지 1개씩 요청
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
  const rangkingData = async () => { //kopis에 카테고리별 랭킹10개씩 요청
    const today = new Date();
    const startDate = format(today, 'yyyyMMdd');

    for (const options of KopisOption) {
      try {
        const data = await fetchRanking(ServiceKey.KPOPS, options.code, 'month', '11', startDate);
        const filteredData = data.slice(0, 10);
        if (data.length > 0) {
          setRankingItem(prevData => [...prevData, {code:options.code, data:[...data]}]);
          setContentsRankingItem(prevData => [...prevData, {code:options.code, data:[...filteredData]}]);
        } else {
          setRankingItem({data});
          setContentsRankingItem({filteredData});
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  
  // const SeoulResponse = () => {//openapi.seoul에 요청
  //   fetchSeoul(selectedOption, searchText, 10)
  //   .then(data => setSeoulData(data))
  //   .catch(error => console.error('Error fetching data:', error));
  // };

  // const KopisResponse = () => {//kopis에 장르별정보 요청
  //   const today = new Date();
  //   const startDate = format(today, 'yyyyMMdd');
  //   const endDate = format(addDays(today, 30), 'yyyyMMdd'); // 오늘부터 10일 후

  //   fetchKopis(ServiceKey.KPOPS, 10, startDate, endDate, '%20', '%20', searchText2)
  //   .then(data => setKopisData(data))
  //   .catch(error => console.error('Error fetching data:', error));
  // };

  const FestivalResponse = () => {//kopis에 축제정보 요청
    const today = new Date();
    const startDate = format(today, 'yyyyMMdd');
    const endDate = format(addDays(today, 10), 'yyyyMMdd'); // 오늘부터 10일 후

    fetchFestival(ServiceKey.KPOPS, 10, startDate, endDate, '%20', '%20', searchText2)
    .then(data => setFestivalItem(data))
    .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    bannerData();
    rangkingData()
    FestivalResponse()
    // SeoulResponse()
    // KopisResponse()
  }, []);

  // const Search = (e) => {
  //   e.preventDefault();
  //   SeoulResponse()
  // };
  // const Search2 = (e) => {
  //   e.preventDefault();
  //   KopisResponse()
  // };
  const [CateCode,setCateCode] = useState('AAAA');

  const CateSelect = (Cate) => {//상위 component_navi에서 선택한 카테고리 코드 받아옴
    setCateCode(Cate);
    console.log(Cate);
};

  return (
    <div className='Wraper'>
      <Header CateSelect={CateSelect}></Header>
      {/* <Banner BannerItem={BannerItem}></Banner>
      <Content1 Item={ContentsRankingItem}></Content1>
      <Content2 Item={ContentsRankingItem}></Content2>
      <Content3 Item={FestivalItem}></Content3> */}
      <LangkingPage Item={RankingItem} CateCode={CateCode}></LangkingPage>

      {/* <div className='contents content1'>
        {RankingItem.length > 0 ? (
          RankingItem.map((data, index) => (
            <div className='contentsBox' key={index}>
                <div>
                  <h4>{data.code} 랭킹</h4>
                  {data.map((item, i) => (
                    <p key={i}>{item.TITLE}</p>
                  ))}
                </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div> */}

      {/* <div className='seoulWrap'>
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
        <form ref={form2}>
          <select name="option" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            {SeoulOption.map((option) => (
              <option value={option} key={option}>{option === '%20' ? '분류' : option}</option>
            ))}
          </select>
          <input value={searchText2} onChange={(e) => setSearchText2(e.target.value)}></input>
          <button onClick={Search2}>검색</button>
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
        
      </div> */}
    </div>
  );
}

export default App;