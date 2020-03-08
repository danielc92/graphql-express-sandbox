const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt
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

const LogOptionsType = new GraphQLEnumType({
  name: "LogOptions",
  values: {
    WARNING: { value: "WARNING" },
    INFO: { value: "INFO" },
    ERROR: { value: "ERROR" }
  }
})

const LogType = new GraphQLObjectType({
  name: "Log",
  fields: () => {
    return {
      id: { type: GraphQLID },
      message: { type: GraphQLString },
      type: { type: LogOptionsType },
      timestamp: { type: GraphQLFloat }
    }
  }
})

const LogListType = new GraphQLList(LogType)
module.exports = {
  UserType,
  UserListType,
  BookingType,
  BookingListType,
  LogType,
  LogOptionsType,
  LogListType
}
