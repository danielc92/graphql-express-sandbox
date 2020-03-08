const express = require('express')
const graphqlHTTP = require('express-graphql')
const {buildSchema} = require('graphql')

const app = express()



const schema = buildSchema(`
type Query {
    hello: String
}`)

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(4000, ()=> console.log('Server now running, access on localhost:4000/graphql'))