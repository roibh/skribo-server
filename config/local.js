module.exports.Config = {

    "database": {
        "mongodb": {
            "useObjectId": true,
            "host": "mongodb://skribo:Kardigan24$@ds249079.mlab.com:49079/skribo"

        }
    },

    db: {
        ssl: false,
        user: 'skribo',
        host: 'mongodb://skribo:Kardigan24%24@ds249079.mlab.com:49079/skribo',
        database: 'skribo',
        password: '1234',
        port: 5432,
        url: process.env.DATABASE_URL
    }


} 