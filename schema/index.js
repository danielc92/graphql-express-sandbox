const { GraphQLObjectType, GraphQLSchema } = require("graphql")
const { userQueries, userMutations } = require("./user")
const { bookingQueries, bookingMutations } = require("./bookings")
const { logQueries } = require("./logs")
const { placeQueries, placeMutations } = require("./place")

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...bookingQueries,
    ...logQueries,
    ...placeQueries
  }
})

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...bookingMutations,
    ...placeMutations
  }
})

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

module.exports = Schema
