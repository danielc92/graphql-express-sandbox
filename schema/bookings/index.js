const { BookingListType, BookingType } = require("../../types")
let Bookings = require("../../data/bookings.json")
const { GraphQLNonNull, GraphQLID, GraphQLString } = require("graphql")

const bookingQueries = {
  bookings: {
    type: BookingListType,
    resolve(parent, args) {
      return Bookings
    }
  }
}

const bookingMutations = {
  createBooking: {
    type: BookingType,
    args: {
      user_id: { type: new GraphQLNonNull(GraphQLID) },
      location: { type: new GraphQLNonNull(GraphQLString) },
      date: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
      const booking = {
        user_id: parseInt(args.user_id),
        location: args.location,
        date: args.date,
        id: Bookings.length + 1
      }
      Bookings.push(booking)
      return booking
    }
  },
  deleteBooking: {
    type: BookingType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, args) {
      Bookings = [...Bookings.filter(b => String(b.id) !== args.id)]
      return Bookings
    }
  },
  updateBooking: {
    type: BookingType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      location: { type: GraphQLString },
      date: { type: GraphQLString }
    },
    resolve(parent, args) {
      Bookings = [
        ...Bookings.map(b => {
          if (String(b.id) === args.id) {
            const { location, date } = args
            return { ...b, location, date }
          }
          return b
        })
      ]
      return Bookings.find(b => String(b.id) === args.id)
    }
  }
}

module.exports = {
  bookingQueries,
  bookingMutations
}
