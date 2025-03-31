import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { format, addDays } from 'date-fns';

import { fetchSeoul, fetchKopis, fetchRanking, fetchFestival } from './js/api'; // api.js에서 fetchSeoul 함수를 가져옵니다.
import { SeoulOption, KopisOption, ServiceKey } from './js/Option'

import { Header } from './components/header'
import MainPage from './pages/main';
import LangkingPage from './pages/ranking';
import DetailPage from './pages/detail';
import ListPage from './pages/list';

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';



import axios from 'axios';
function App() {
  const [BannerItem,setBannerItem] = useState([]);
  const [RankingItem,setRankingItem] = useState([]);
  const [ContentsRankingItem,setContentsRankingItem] = useState([]);
  const [FestivalItem,setFestivalItem] = useState([]);
  const [CateCode,setCateCode] = useState('AAAA');
  

  const bannerData = async () => { //openapi.seoul에 카테고리별 이미지 1개씩 요청
    const searchText = '';
    const page = 1;
    const row = 1;
    for (const options of SeoulOption) {
      try {
        const data = await fetchSeoul(ServiceKey.SEOUL, options, searchText, page, row);
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
    const startDate = format(addDays(today, -7), 'yyyyMMdd'); // 오늘부터 7일 전  
    const endDate = format(today, 'yyyyMMdd');

    for (const options of KopisOption) {
      try {
        const data = await fetchRanking(ServiceKey.KPOPS, startDate, endDate, options.code);
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
  
  const FestivalResponse = () => {//kopis에 축제정보 요청
    const today = new Date();
    const startDate = format(today, 'yyyyMMdd');
    const endDate = format(addDays(today, 10), 'yyyyMMdd'); // 오늘부터 10일 후

    fetchFestival(ServiceKey.KPOPS, 10, startDate, endDate)
    .then(data => setFestivalItem(data))
    .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    bannerData();
    rangkingData()
    FestivalResponse()
  }, []);


  const CateSelect = (CateCode) => {//상위 component_navi에서 선택한 카테고리 코드 받아옴
    setCateCode(CateCode);
  };

  return (
    <Router>
      <div className='Wraper'>
        <Header CateSelect={CateSelect}></Header>
        <Routes>
          <Route path="/" element={<MainPage BannerItem={BannerItem} ContentsRankingItem={ContentsRankingItem} FestivalItem={FestivalItem}/>} />
          <Route path="/Langking" element={<LangkingPage Item={RankingItem} CateCode={CateCode}/>} />
          <Route path="/Detail" element={<DetailPage />} />
          <Route path="/List" element={<ListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;