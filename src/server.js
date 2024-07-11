const express = require("express");
const axios = require("axios");
const convert = require("xml-js");
const request = require("request")
const cors = require("cors");

const app = express();
app.use(cors());
app.get("/api/:ServiceKey/:Count/:Period1/:Period2/:Category/:Region/:Title", async (req, res) => {
    const params = req.params;
    // console.log(params);
    let url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${params.ServiceKey}&stdate=${params.Period1}&eddate=${params.Period2}&cpage=1&rows=${params.Count}`;
    // console.log(url);
    
    if (params.Category && params.Category !== ' ') url += `&shcate=${params.Category}`;
    if (params.Region && params.Region !== ' ') url += `&signgucode=${params.Region}`;
    if (params.Title && params.Title !== ' ') url += `&shprfnm=${encodeURIComponent(params.Title)}`;

    try {
        const response = await axios.get(url);
        const xmlToJson = convert.xml2json(response.data, { compact: true, spaces: 4 });
        // console.log(url);
        res.send(xmlToJson);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        res.status(500).send(error.toString());
    }
})
app.get("/apiRanking/:ServiceKey/:Category/:Ststype/:Area/:Date", async (req, res) => {
    const params = req.params;
    // console.log(params);


    let url = `http://www.kopis.or.kr/openApi/restful/boxoffice?service=${params.ServiceKey}&ststype=${params.Ststype}&date=${params.Date}&catecode=${params.Category}&area=${params.Area}`;
    // console.log(params);
    // console.log(url);
    try {
        const response = await axios.get(url);
        const xmlToJson = convert.xml2json(response.data, { compact: true, spaces: 4 });
        // console.log(url);
        res.send(xmlToJson);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        res.status(500).send(error.toString());
    }
})
app.get("/apiFestival/:ServiceKey/:Count/:Period1/:Period2/:Category/:Region/:Title", async (req, res) => {
    const params = req.params;
    // console.log(params);


    let url = `http://www.kopis.or.kr/openApi/restful/prfawad?service=${params.ServiceKey}&stdate=${params.Period1}&eddate=${params.Period2}&cpage=1&rows=${params.Count}`;
    // console.log(params);
    // console.log(url);
    if (params.Category && params.Category !== ' ') url += `&shcate=${params.Category}`;
    if (params.Region && params.Region !== ' ') url += `&signgucode=${params.Region}`;
    if (params.Title && params.Title !== ' ') url += `&shprfnm=${encodeURIComponent(params.Title)}`;

    try {
        const response = await axios.get(url);
        const xmlToJson = convert.xml2json(response.data, { compact: true, spaces: 4 });
        console.log(url);
        res.send(xmlToJson);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        res.status(500).send(error.toString());
    }
})
// app.get("/img/:url", async (req, res) => {
//     const params = req.params;
//     let url = params.url;
//     // console.log(params);
//     console.log(url);
//     request(
//         {
//             url: url,
//             method: 'GET',
//         }, (error, response, body) => {
//             res.send(body);
//         }
//     )
// })

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
