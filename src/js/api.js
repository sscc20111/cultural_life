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

const fetchKopis = async (ServiceKey, Count, Period1, Period2, Category, Region, Title) => {
    try {
        const response = await axios.get(`http://localhost:3002/api/${ServiceKey}/${Count}/${Period1}/${Period2}/${Category}/${Region}/${Title}`);
        const fetchData = response.data.dbs.db.map((event) => ({
            TITLE    : event.prfnm._text,     //제목
            CODENAME : event.genrenm._text,   //분류
            DATE1    : event.prfpdfrom._text, //날짜(시작)
            DATE2    : event.prfpdto._text,   //날짜(종료)
            PLACE    : event.fcltynm._text,   //장소
            MAIN_IMG : event.poster._text,    //포스터
            DATA_ID: event.mt20id._text,   //공연 ID
        })); 
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

const fetchFestival = async (ServiceKey, Count, Period1, Period2, Category, Region, Title) => {
    try {
        const response = await axios.get(`http://localhost:3002/apiFestival/${ServiceKey}/${Count}/${Period1}/${Period2}/${Category}/${Region}/${Title}`);
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

// const imgResponse = async (img_url) => {
//     try {
//         const response = await axios.get(`http://localhost:3002/api/${img_url}`);
//         console.log(response);
//         return response;
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// };

export {fetchSeoul, fetchKopis, fetchRanking, fetchFestival}
