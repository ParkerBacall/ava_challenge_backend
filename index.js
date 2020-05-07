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
              "url": "https://ava-string-editor.web.app/"
            },
            "language": "node.js",
            "sources": {
                "frontend": "https://github.com/ParkerBacall/ava_challenge_frontend",
                "backend": "https://github.com/ParkerBacall/ava_challenge_backend"
            },
            "answers": {
              "1": "The first step for me was to make sure I understood the problem. I dedicated around an hour to learning about the algoritm being used and making sure I understood all of the instructions. Then I broke down how I would be solving the problems, what languages I would be using, what libraries, etc. After that I broke down the challenge even further into think vertial slices and went at it. I also made sure to connect my frontend and backend early.",
              "2": "Haha, what wouldn't I add? Just kidding, obviously I would have wanted my app to meet all of the criteria. But, in addition to that I would have loved to give the frontend a nice presentation mimicing google docs. I liked the idea of having a big input block where the algorithm can be edited, sending mutations to the backend, and that would probably be the next feature I added. I also was excited about using websockets to get mutations made by other users showing up in real time, like a chat. If I added thos two features I would just need to implement the algoritm to deal with conflicts. For bonus features I was thinking about showing who is currently editing the conversation and implementing an undo button.",
              "3": "I would not start the instructions with going in depth on the algorith. I ended up focusing to much on that before getting into what the app was really going to be and I lost a lot of time that I could have spent showing what I know. Ideally the instructions would be a step by step walkthough of what is expected but I found myself jumping around those instructions a lot."
            }
    })
})

app.post('/mutations', async (request, response) =>{
    if (await Conversation.query().findById(request.body.conversationId)){
        queries.mutations.create(request.body)
        .then(res => response.send(res))  

    } else{
        await Conversation.query().insert({
            "id": request.body.conversationId,
            "lastMutation": request.body,
            "text" : request.body.data.text
          })
          queries.mutations.create(request.body)

          .then(res => response.send(res))  
    }
    
})

app.patch('/conversations', async (request, response) => {
    await Conversation.query()
        .findById(request.body.id)
        .patch({
        text: request.body.text,
        lastMutation: request.body.lastMutation
        })
        response.send({
            'text': request.body.text,
            'lastMutation': request.body.lastMutation
        })
    })

app.get('/conversations', async (request, response) => {
    const conversations = await Conversation.query()
    .withGraphFetched('mutations')

    response.send({
        "conversations": [
            conversations
        ],
        "msg": "all good",
        "ok": true
    })
})

app.delete('/conversations/:id', async(request, response) => {
    await Conversation.relatedQuery('mutations')
    .for(request.params.id)
    .delete()
    await Conversation.query().deleteById(request.params.id);
    response.status(204).send({
        "msg": "string, an error message, if needed",
        "ok": true
    })
})