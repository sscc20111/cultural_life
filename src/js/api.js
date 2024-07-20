import axios from 'axios';

const fetchSeoul = async (Option, searchText, Count) => {
    try {
        const response = await axios.get(`http://openapi.seoul.go.kr:8088/596a4c615473736339366a51536f54/json/culturalEventInfo/1/${Count}/${Option}/${searchText}/`);
        const fetchData = response.data.culturalEventInfo.row.map((event) => ({
            TITLE    : event.TITLE,    //제목
            CODENAME : event.CODENAME, //분류
            DATE     : event.DATE,     //날짜
            PLACE    : event.PLACE,    //장소
            USE_TRGT : event.USE_TRGT, //이용대상
            USE_FEE  : event.USE_FEE,  //이용요금
            MAIN_IMG : event.MAIN_IMG, //포스터
        }));
        return fetchData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const fetchKopis = async (ServiceKey, Page, Count, Period1, Period2, Category, Region, Title) => {
    try {
        const response = await axios.get(`http://localhost:3002/api/${ServiceKey}/${Page}/${Count}/${Period1}/${Period2}/${Category}/${Region}/${Title}`);
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

const fetchRanking = async (ServiceKey, Category, Ststype, Area, Date) => {
    try {
        const response = await axios.get(`http://localhost:3002/apiRanking/${ServiceKey}/${Category}/${Ststype}/${Area}/${Date}`);
        // console.log(response);
        const fetchData = response.data.boxofs.boxof.map((event) => {
            return {
                TITLE   : event.prfnm._text,   //제목
                CODENAME: event.cate._text,   //분류
                DATE1    : event.prfpd._text,   //날짜
                PLACE   : event.prfplcnm._text,   //장소
                AREA   : event.area._text,   //지역
                MAIN_IMG: 'http://www.kopis.or.kr'+event.poster._text,   //포스터
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
        const response = await axios.get(`http://localhost:3002/apiFestival/${ServiceKey}/${Count}/${Period1}/${Period2}`);
        // console.log(response);
        const fetchData = response.data.dbs.db.map((event) => {
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
        const response = await axios.get(`http://localhost:3002/apiDetail/${ServiceKey}/${DATA_ID}`);
        // console.log(response.data.dbs.db);
        const event = response.data.dbs.db;
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
