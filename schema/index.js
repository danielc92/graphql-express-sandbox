const userFields = require("./user")
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError
} = require("graphql")

const { UserType } = require("../types/index")
const {userQueries, userMutations} = require('./user')
const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: userQueries
  }
})

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    insertUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) }
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
    },
    findUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const result = Users.find(u => String(u.id) === args.id)
        return result
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

module.exports = Schema