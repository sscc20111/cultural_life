import axios from 'axios';

const fetchSeoul = async (Option, searchText, Count) => {
    try {
        const response = await axios.get(`http://openapi.seoul.go.kr:8088/596a4c615473736339366a51536f54/json/culturalEventInfo/1/${Count}/${Option}/${searchText}/`);
        const fetchData = response.data.culturalEventInfo.row.map((event) => ({
            TITLE: event.TITLE,         //제목
            CODENAME: event.CODENAME,   //분류
            DATE: event.DATE,           //날짜
            PLACE : event.PLACE,        //장소
            USE_TRGT : event.USE_TRGT,  //이용대상
            USE_FEE : event.USE_FEE,    //이용요금
            MAIN_IMG: event.MAIN_IMG,   //포스터
        }));
        return fetchData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const fetchKopis = async (ServiceKey, Count, Period1, Period2, Category, Region, Title) => {
    try {
        const response = await axios.get(`http://localhost:3002/${ServiceKey}/${Count}/${Period1}/${Period2}/${Category}/${Region}/${Title}`);
        // console.log(response);
        const fetchData = response.data.elements[0].elements.map((event) => {
            // console.log(event);
            return {
                TITLE   : event.elements[1].elements[0].text,   //제목
                CODENAME: event.elements[7].elements[0].text,   //분류
                DATE1    : event.elements[2].elements[0].text,   //날짜
                DATE2    : event.elements[3].elements[0].text,   //날짜
                PLACE   : event.elements[4].elements[0].text,   //장소
                MAIN_IMG: event.elements[5].elements[0].text,   //포스터
            };
        }); 
        return fetchData;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

export {fetchSeoul, fetchKopis}
