const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError
} = require("graphql")

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

module.exports = {
  UserType
}
