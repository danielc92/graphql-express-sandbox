const { GraphQLObjectType, GraphQLSchema } = require("graphql")
const { userQueries, userMutations } = require("./user")
const { bookingQueries, bookingMutations } = require("./bookings")
const { logQueries } = require("./logs")

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...bookingQueries,
    ...logQueries
  }
})

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...bookingMutations
  }
})

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

module.exports = Schema
