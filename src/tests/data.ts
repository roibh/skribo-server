import { DBHandler } from '@methodus/data';
DBHandler.config = {
    connections: {
        default: {
            db: 'test',
            exchanges: ['event-bus', 'cache-bus'],
            poolSize: 10,
            readPreference: 'primaryPreferred',
            server: 'mongodb://localhost:27017',
            ssl: false,
        },
    },
};


global.User = {
    EmbedId: '000000000000000000',
    GroupId: '000000000000000000',
    Name: 'test user',
    ResultId: '000000000000000000',
    ScriptId: '000000000000000000',
    UserId: '000000000000000000',
}

export const ReportResultEmbeded = {
    reportType: 'embeded',
    results: {
        'Leibish': [{ 'label': '+yellow +diamonds', 'value': 61052 },
        { 'label': '+yellow +diamond +earrings', 'value': 36713 },
        { 'label': '+pink +diamonds', 'value': 30628 },
        { 'label': '+yellow +engagement +rings', 'value': 24264 }, { 'label': '+loose +blue +diamonds', 'value': 21588 },
        { 'label': '+pink +diamond +rings', 'value': 17669 },
        { 'label': '+loose +yellow +diamonds', 'value': 13871 },
        { 'label': '+yellow +diamond +jewelry', 'value': 13554 }, { 'label': '+yellow +diamond +rings', 'value': 12879 }, { 'label': '+yellow +diamonds', 'value': 12524 }], 'פספורטכארד מכר': [{ 'label': '[פספורט קארד]', 'value': 58124 }, { 'label': '+passportcard', 'value': 23938 }, { 'label': '+פספורט +קארד', 'value': 12960 }, { 'label': '[passport card]', 'value': 11722 }, { 'label': '[passportcard]', 'value': 7292 }, { 'label': '[פספורטכארד]', 'value': 7131 }, { 'label': '+ביטוח +פספורט +קארד', 'value': 4609 }, { 'label': '+ביטוח +פספורט', 'value': 4263 }, { 'label': '+פספורט +ביטוח', 'value': 3283 }, { 'label': '+פספורט +כארד', 'value': 3138 }], 'AllJobs': [{ 'label': '[alljobs]', 'value': 47259 }, { 'label': '[דרושים]', 'value': 33975 }, { 'label': '[דרושים]', 'value': 33703 }, { 'label': '[alljobs]', 'value': 21289 }, { 'label': '[אולגובס]', 'value': 15058 }, { 'label': '+עבודה +לנוער', 'value': 11026 }, { 'label': '[גוב מאסטר]', 'value': 10012 }, { 'label': '[אולגובס]', 'value': 9672 }, { 'label': '+דרושים +עובדים', 'value': 9462 }, { 'label': '[jobmaster]', 'value': 8886 }], 'Walla!Shops': [{ 'label': '[וואלה שופס]', 'value': 53629 }, { 'label': '[wallashops]', 'value': 8484 }, { 'label': '\'וואלה שופס\'', 'value': 7534 }, { 'label': '[walla shops]', 'value': 2991 }, { 'label': 'שרשרת שם', 'value': 2973 }, { 'label': 'שרשרת שם מזהב', 'value': 1908 }, { 'label': 'שרשרת ילדים', 'value': 1204 }, { 'label': '[wallashop]', 'value': 1120 }, { 'label': '[walla shop]', 'value': 1069 }, { 'label': '[וואלה שופ]', 'value': 848 }]
    }
}
export const ReportResultEmbededCopy =
    { "reportType": "embeded", "results": { "Leibish": [], "פספורטכארד מכר": [], "AllJobs": [], "Walla!Shops": [], "z-Dr Stephan": [], "Aviation Links - Domestic": [], "Olga Raz Method": [], "z-ediamonds-oldest": [], "Neurim": [], "Manpower": [], "יוניסף": [], "Ruppin AC -Yam": [], "YamOnline": [] } }


export const ReportResultCollection = {
    reportType: 'collection',
    results:

    {
        'Leibish': [{ 'label': '+yellow +diamonds', 'value': 61052 },
        { 'label': '+yellow +diamond +earrings', 'value': 36713 },
        { 'label': '+pink +diamonds', 'value': 30628 },
        { 'label': '+yellow +engagement +rings', 'value': 24264 }, { 'label': '+loose +blue +diamonds', 'value': 21588 },
        { 'label': '+pink +diamond +rings', 'value': 17669 },
        { 'label': '+loose +yellow +diamonds', 'value': 13871 },
        { 'label': '+yellow +diamond +jewelry', 'value': 13554 }, { 'label': '+yellow +diamond +rings', 'value': 12879 }, { 'label': '+yellow +diamonds', 'value': 12524 }], 'פספורטכארד מכר': [{ 'label': '[פספורט קארד]', 'value': 58124 }, { 'label': '+passportcard', 'value': 23938 }, { 'label': '+פספורט +קארד', 'value': 12960 }, { 'label': '[passport card]', 'value': 11722 }, { 'label': '[passportcard]', 'value': 7292 }, { 'label': '[פספורטכארד]', 'value': 7131 }, { 'label': '+ביטוח +פספורט +קארד', 'value': 4609 }, { 'label': '+ביטוח +פספורט', 'value': 4263 }, { 'label': '+פספורט +ביטוח', 'value': 3283 }, { 'label': '+פספורט +כארד', 'value': 3138 }], 'AllJobs': [{ 'label': '[alljobs]', 'value': 47259 }, { 'label': '[דרושים]', 'value': 33975 }, { 'label': '[דרושים]', 'value': 33703 }, { 'label': '[alljobs]', 'value': 21289 }, { 'label': '[אולגובס]', 'value': 15058 }, { 'label': '+עבודה +לנוער', 'value': 11026 }, { 'label': '[גוב מאסטר]', 'value': 10012 }, { 'label': '[אולגובס]', 'value': 9672 }, { 'label': '+דרושים +עובדים', 'value': 9462 }, { 'label': '[jobmaster]', 'value': 8886 }], 'Walla!Shops': [{ 'label': '[וואלה שופס]', 'value': 53629 }, { 'label': '[wallashops]', 'value': 8484 }, { 'label': '\'וואלה שופס\'', 'value': 7534 }, { 'label': '[walla shops]', 'value': 2991 }, { 'label': 'שרשרת שם', 'value': 2973 }, { 'label': 'שרשרת שם מזהב', 'value': 1908 }, { 'label': 'שרשרת ילדים', 'value': 1204 }, { 'label': '[wallashop]', 'value': 1120 }, { 'label': '[walla shop]', 'value': 1069 }, { 'label': '[וואלה שופ]', 'value': 848 }]
    }
}






export const Embed = {
    Name: 'Test embed',
    Page: 'https://www.google.com',
    ScriptId: global.User.ScriptId,
    Variables: [{
        name: 'limit',
        type: 'number',
        value: '5',
    },
    {
        name: 'keyValue',
        type: 'string',
        value: 'a fancy key',
    },
    {
        name: 'keyValue',
        type: 'date',
        value: 'a fancy key',
    }, {
        name: 'keyValue',
        type: 'date-span',
        value: 'TODAY',
    },
    {
        name: 'keyValue',
        type: 'date-span',
        value: 'YESTERDAY',
    },
    {
        name: 'keyValue',
        type: 'date-span',
        value: 'LAST_7_DAYS',
    },
    {
        name: 'keyValue',
        type: 'date-span',
        value: 'LAST_MONTH',
    }],
};
