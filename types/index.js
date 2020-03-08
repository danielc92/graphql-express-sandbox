const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
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

const UserListType = new GraphQLList(UserType)

const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => {
    return {
      id: {
        type: GraphQLID
      },
      user_id: {
        type: GraphQLID
      },
      date: {
        type: GraphQLString
      },
      location: {
        type: GraphQLString
      }
    }
  }
})

const BookingListType = new GraphQLList(BookingType)

module.exports = {
  UserType,
  UserListType,
  BookingType,
  BookingListType
}
