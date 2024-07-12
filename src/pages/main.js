import React, { useEffect, useState } from 'react';

import { Banner } from '../components/banner'
import Content01 from '../components/contents/content01'
import Content02 from '../components/contents/content02'
import Content03 from '../components/contents/content03'

const MainPage = ({BannerItem, ContentsRankingItem, FestivalItem}) => {

    return(
        <div className='MainPage'>
            <Banner BannerItem={BannerItem}></Banner>
            <Content01 Item={ContentsRankingItem}></Content01>
            <Content02 Item={ContentsRankingItem}></Content02>
            <Content03 Item={FestivalItem}></Content03>
        </div>
    )
};

export default MainPage