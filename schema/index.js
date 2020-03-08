const { GraphQLObjectType, GraphQLSchema } = require("graphql")
const { userQueries, userMutations } = require("./user")
const { bookingQueries, bookingMutations } = require("./bookings")

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...bookingQueries
  }
})

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations
  }
})

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

module.exports = Schema
