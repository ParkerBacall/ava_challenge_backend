const database = require('./database')

module.exports = {
    mutations: {
        create(input){
        return database('mutations')
        .insert({
            "author": input.author,
            "conversationId": input.conversationId,
            "index": input.data.index,
            "length": input.data.length,
            "text": input.data.text,
            "type": input.data.type,
            "alice": input.origin.alice,
            "bob": input.data.bob
        })
        .returning('*')
        }
    }
}