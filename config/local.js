module.exports.Config = {
 

        connections: {
        'default': {
            server: 'mongodb://localhost:27017',
            db: 'skribo',
            poolSize: 10,
            ssl: false,
            exchanges: ['event-bus', 'cache-bus'],
            readPreference: 'primaryPreferred'
        }
    }


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