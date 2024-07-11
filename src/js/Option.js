const SeoulOption = [
    '%20',
    '교육/체험',
    '국악',
    '기타',
    '독주/독창회',
    '무용',
    '뮤지컬/오페라',
    '연극',
    '전시/미술',
    '축제-기타',
    '축제-문화/예술',
    '축제-전통/역사',
    '콘서트',
    '클래식',
];

const KopisOption = [
    {code:'AAAA', name:'연극'},
    {code:'GGGA', name:'뮤지컬'},
    {code:'CCCA', name:'서양음악(클래식)'},
    {code:'CCCC', name:'한국음악(국악)'},
    {code:'CCCD', name:'대중음악'},
    {code:'BBBC', name:'무용(서양/한국)'},
    {code:'EEEB', name:'서커스/마술'},
    {code:'EEEA', name:'복합'},
    {code:'KID',  name:'아동'},
    
];

const ServiceKey = {
    SEOUL : '596a4c615473736339366a51536f54',
    KPOPS : '2e9d38e5b67d47c3a96d1d6f1388635a',
};

export {SeoulOption, KopisOption, ServiceKey}
