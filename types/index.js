const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt
} = require("graphql")

const Users = require("../data/users.json")
const UserType = new GraphQLObjectType({
  name: "User",
  description: "This type relates to server members.",
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

const PlaceType = new GraphQLObjectType({
  name: "Place",
  description:
    "This type relates to server places, a booking links to this type.",
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      state: { type: GraphQLString },
      country: { type: GraphQLString },
      owner: {
        type: UserType,
        resolve(parent, args) {
          return Users.find(u => u.id === parent.owner_id)
        }
      }
    }
  }
})

const PlaceListType = new GraphQLList(PlaceType)

const BookingType = new GraphQLObjectType({
  name: "Booking",
  description: "This type relates to server bookings.",
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
  description: "This type relates to server logs.",
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
  LogListType,
  PlaceType,
  PlaceListType
}
