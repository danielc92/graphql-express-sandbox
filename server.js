const express = require("express")
const graphqlHTTP = require("express-graphql")
const app = express()
const Schema = require("./schema")

app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true
  })
)

app.listen(4000, () =>
  console.log("Server now running, access on localhost:4000/graphql")
)
