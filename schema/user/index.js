const {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLError
} = require("graphql")
const { UserType, UserListType } = require("../../types")
const Users = require("../../data/users.json")

const userQueries = {
  users: {
    type: UserListType,
    resolve(parent, args) {
      return Users
    }
  }
}

const userMutations = {
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

module.exports = {
  userMutations,
  userQueries
}
