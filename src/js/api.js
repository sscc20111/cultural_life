import axios from 'axios';
import { xml2js } from 'xml-js';
const convert = require("xml-js");

const fetchSeoul = async (ServiceKey, Option, SearchText, Page, Count) => {
    try {
        const url = `http://nmwoo.info/api/SeoulData.php?ServiceKey=${ServiceKey}&Page=${Page}&Count=${Count}&Option=${Option}&SearchText=${SearchText}/`
        const response = await axios.get(url);
        // console.log(url);
        // console.log(response.data.culturalEventInfo);
        const fetchData = response.data.culturalEventInfo.row.map((event) => ({
            TITLE    : event.TITLE,    //제목
            CODENAME : event.CODENAME, //분류
            DATE     : event.DATE,     //날짜
            PLACE    : event.PLACE,    //장소
            USE_TRGT : event.USE_TRGT, //이용대상
            USE_FEE  : event.USE_FEE,  //이용요금
            MAIN_IMG : event.MAIN_IMG, //포스터
        }));
        // console.log(fetchData.TITLE);
        return fetchData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const fetchKopis = async (ServiceKey, Page, Count, Period1, Period2, Category, Region, Title) => {
    try {
        const url = `http://nmwoo.info/api/KopisData.php?${ServiceKey}/${Page}/${Count}/${Period1}/${Period2}/${Category}/${Region}/${Title}`
        const response = await axios.get(url);
        // console.log(url);
        const fetchData = (Array.isArray(response.data.dbs.db)) ? (
            response.data.dbs.db.map((event) => ({
                TITLE    : event.prfnm._text,     //제목
                CODENAME : event.genrenm._text,   //분류
                DATE1    : event.prfpdfrom._text, //날짜(시작)
                DATE2    : event.prfpdto._text,   //날짜(종료)
                PLACE    : event.fcltynm._text,   //장소
                MAIN_IMG : event.poster._text,    //포스터
                DATA_ID: event.mt20id._text,   //공연 ID
            }))
        ):(
            {
                TITLE    : response.data.dbs.db.prfnm._text,     //제목
                CODENAME : response.data.dbs.db.genrenm._text,   //분류
                DATE1    : response.data.dbs.db.prfpdfrom._text, //날짜(시작)
                DATE2    : response.data.dbs.db.prfpdto._text,   //날짜(종료)
                PLACE    : response.data.dbs.db.fcltynm._text,   //장소
                MAIN_IMG : response.data.dbs.db.poster._text,    //포스터
                DATA_ID: response.data.dbs.db.mt20id._text,   //공연 ID
            }
        ) 
        return fetchData;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};

const fetchRanking = async (ServiceKey, StDate, EdDate, Catecode) => {
    try {
        const url = `http://nmwoo.info/api/KopisRank.php?ServiceKey=${ServiceKey}&StDate=${StDate}&EdDate=${EdDate}&Catecode=${Catecode}`
        // console.log(url);
        const response = await axios.get(url);
        // console.log(response.data);
        const xmlToJson = convert.xml2js(response.data, {compact: true, spaces: 4})
        // console.log(xmlToJson.boxofs.boxof);
        const fetchData = xmlToJson.boxofs.boxof.map((event) => {
            return {
                TITLE   : event.prfnm._text,   //제목
                CODENAME: event.cate._text,   //분류
                DATE1    : event.prfpd._text,   //날짜
                PLACE   : event.prfplcnm._text,   //장소
                AREA   : event.area._text,   //지역
                MAIN_IMG: event.poster._text,   //포스터
                DATA_ID: event.mt20id._text,   //공연 ID
            };
        }); 
        return fetchData;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

const fetchFestival = async (ServiceKey, Count, Period1, Period2) => {
    try {
        const url = `http://nmwoo.info/api/KopisFestival.php?ServiceKey=${ServiceKey}&Period1=${Period1}&Period2=${Period2}&Count=${Count}`
        // console.log(url);
        const response = await axios.get(url);
        const xmlToJson = convert.xml2js(response.data, {compact: true, spaces: 4})
        // console.log(xmlToJson);
        const fetchData = xmlToJson.dbs.db.map((event) => {
            return {
                TITLE   : event.prfnm._text,   //제목
                CODENAME: event.genrenm._text,   //분류
                DATE1    : event.prfpdfrom._text, //날짜(시작)
                DATE2    : event.prfpdto._text,   //날짜(종료)
                PLACE   : event.fcltynm._text,   //장소
                MAIN_IMG: event.poster._text,   //포스터
                DATA_ID: event.mt20id._text,   //공연 ID
            };
        }); 
        return fetchData;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

const fetchDetail = async (ServiceKey, DATA_ID) => {
    try {
        const url = `http://nmwoo.info/api/KopisData.php?ServiceKey=${ServiceKey}&DATA_ID=${DATA_ID}`;
        const response = await axios.get(url);
        // console.log(url);
        const xmlToJson = convert.xml2js(response.data, {compact: true, spaces: 4})
        // console.log(xmlToJson);
        const event = xmlToJson.dbs.db;
        const fetchData = {
                TITLE   : event.prfnm._text,   //제목
                DATE1    : event.prfpdfrom._text, //날짜(시작)
                DATE2    : event.prfpdto._text,   //날짜(종료)
                PLACE   : event.fcltynm._text,   //장소
                CAST: event.prfcast._text,   //공연출연진
                CREW: event.prfcrew._text,   //공연제작진
                RUN_TIME: event.prfruntime._text,   //공연 런타임
                AGE: event.prfage._text,   //공연 관람 연령
                PRODUCER_COMPANY: event.entrpsnm._text,   //기획제작사
                PRODUCER: event.entrpsnmP._text,   //제작사
                PRICE: event.pcseguidance._text,   //티켓가격
                MAIN_IMG: event.poster._text,   //포스터
                CODENAME: event.genrenm._text,   //장르
                STATUS: event.prfstate._text,   //공연상태
                INTRODUCE_IMG: event.styurls.styurl,   //소개이미지목록
                DETAIL_TIME: event.dtguidance._text,   //공연시간
                TIKET: event.relates.relate,   //예매처목록
        }; 
        return fetchData;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

// const imgResponse = async (img_url) => {
//     try {
//         const response = await axios.get(`http://localhost:3002/api/${img_url}`);
//         console.log(response);
//         return response;
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// };

export {fetchSeoul, fetchKopis, fetchRanking, fetchFestival, fetchDetail}
