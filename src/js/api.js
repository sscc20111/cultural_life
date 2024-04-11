import axios from 'axios';

const fetchSeoul = async (selectedOption, searchText) => {
    try {
        const response = await axios.get(`http://openapi.seoul.go.kr:8088/596a4c615473736339366a51536f54/json/culturalEventInfo/1/10/${selectedOption}/${searchText}/`);
        const fetchData = response.data.culturalEventInfo.row.map((event) => ({
            CODENAME: event.CODENAME,
            GUNAME: event.GUNAME,
            TITLE: event.TITLE,
            DATE: event.DATE,
            MAIN_IMG: event.MAIN_IMG,
            PLACE : event.PLACE
        }));
        return fetchData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export {fetchSeoul}
