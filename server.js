const express = require("express")
const graphqlHTTP = require("express-graphql")
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError
} = require("graphql")
const Users = require("./data/users.json")
const app = express()

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => {
    return {
      id: {
        type: GraphQLID
      },
      first_name: {
        type: GraphQLString
      },
      last_name: {
        type: GraphQLString
      }
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return Users
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    insertUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString }
      },
      resolve(parent, args) {
        const { id, first_name, last_name } = args

        // Check if user exists first
        const exists = Users.some(u => u.id === id)
        if (exists) return new GraphQLError("This user id already exists")

        let user = { id, first_name, last_name }
        Users.push(user)
        return user
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

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
