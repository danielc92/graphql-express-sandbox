const express = require("express")
const graphqlHTTP = require("express-graphql")
const { GraphQLObjectType, GraphQLID, GraphQLSchema } = require("graphql")
const Users = require("./data/users.json")
const app = express()

const UserType = GraphQLObjectType({
  name: "User",
  fields: () => {
    id: {
      type: GraphQLID
    },
    first_name: 
    
  }
})
const RootQuery = GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: UserType,
      resolve(parent, args) {
        return Users
      }
    }
  }
})

const RootMutation = GraphQLObjectType({
  name: "Mutation"
})

const Schema = GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)

app.listen(4000, () =>
  console.log("Server now running, access on localhost:4000/graphql")
)
