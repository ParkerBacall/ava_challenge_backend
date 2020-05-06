const express = require('express')
const app = express()
const port = process.env.PORT || 9001
const bodyParser = require('body-parser')
const cors = require('cors')

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
            "sources": "string, the url of a github repository including your backend sources and your frontend sources",
            "answers": {
              "1": "string, answer to the question 1",
              "2": "string, answer to the question 2",
              "3": "string, answer to the question 3"
            }
    })
})

app.post('mutations', (request, response) =>{
    response.send({
        "msg": "an error message, if needed",
        "ok": "boolean",
        "text": "string, the current text of the conversation, after applying the mutation"
    })
})

app.get('conversations', (request, response) => {
    response.send({
        "conversations": [
            {
              "id": "string",
              "lastMutation": "Object, The last mutation applyed on this conversation",
              "text": "string"
            },
            "..."
          ],
          "msg": "string, an error message, if needed",
          "ok": "boolean"
    })
})

app.delete('coversations', (request, response) => {
    
})