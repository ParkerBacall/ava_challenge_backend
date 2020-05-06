const database = require('./database')

module.exports = {
    conversations: {
        listAll(){
            return database('conversations')
        }
    }
}