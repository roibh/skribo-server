module.exports.Config = {



    db: {
        user: 'postgres',
        host: 'localhost',
        database: 'skribo',
        password: '1234',
        port: 5432,
        url: process.env.DATABASE_URL
    }


}