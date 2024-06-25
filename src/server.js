const express = require("express");
const axios = require("axios");
const convert = require("xml-js");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/:ServiceKey/:Count/:Period1/:Period2/:Category/:Region/:Title", async (req, res) => {
    const params = req.params;
    console.log(params);

    let url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${params.ServiceKey}&stdate=${params.Period1}&eddate=${params.Period2}&cpage=1&rows=${params.Count}`;
    if (params.Category && params.Category !== '%20') url += `&shcate=${params.Category}`;
    if (params.Region && params.Region !== '%20') url += `&signgucode=${params.Region}`;
    if (params.Title && params.Title !== '%20') url += `&shprfnm=${params.Title}`;
    console.log(url);

    request({ url: url, method: 'GET' }, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            res.status(500).send("Server error");
            return;
        }

        console.log("API response status:", response.statusCode);
        console.log("API response body:", body);

        try {
            const xmlToJson = convert.xml2json(body, { compact: true, spaces: 2 });
            res.send(xmlToJson);
        } catch (parseError) {
            console.error("XML parsing error:", parseError);
            res.status(500).send("XML parsing error");
        }
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
