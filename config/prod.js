module.exports.Config = {
    connections: {
        'default': {
            server: `mongodb://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@ds249079.mlab.com:49079`,
            db: 'skribo',
            poolSize: 10,
            ssl: false,
            exchanges: [],
            readPreference: 'primaryPreferred'
        }
    }
}