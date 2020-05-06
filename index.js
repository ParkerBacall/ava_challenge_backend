const express = require('express')
const app = express()
const port = process.env.PORT || 9001
const bodyParser = require('body-parser')
const queries = require('./db/queries.js')
const cors = require('cors')

const { Conversation } = require('./models/schema')

app.use(bodyParser.json())
app.use(cors())

app.listen(port, () =>{
    console.log(`listening on ${port}`)
})

app.get('/ping', (request, response) => {
    response.send({
        msg: "pong",
        ok: true
    })
})

app.get('/info', (request, response) => {
    response.send({
            "ok": true,
            "author": {
              "email": "pbacall2@gmail.com",
              "name": "Parker Bacall"
            },
            "frontend": {
              "url": ""
            },
            "language": "node.js",
            "sources": {
                "frontend": "https://github.com/ParkerBacall/ava_challenge_frontend",
                "backend": "https://github.com/ParkerBacall/ava_challenge_backend"
            },
            "answers": {
              "1": "string, answer to the question 1",
              "2": "string, answer to the question 2",
              "3": "string, answer to the question 3"
            }
    })
})

app.post('/mutations', (request, response) =>{
    queries.mutations.create(request.body)
    .then(res => response.send(res))  
    .withFe
})

app.get('/conversations', async (request, response) => {
    const conversations = await Conversation.query()
    .withGraphFetched('mutations')
    response.send(conversations)
})

app.delete('/coversations', (request, response) => {

})