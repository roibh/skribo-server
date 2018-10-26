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
} 