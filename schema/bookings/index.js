const { BookingListType, BookingType } = require("../../types")
const Bookings = require("../../data/bookings.json")
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
  deleteBooking: {},
  updateBooking: {},
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
        date: args.date
      }
      Bookings.push(booking)
      return booking
    }
  }
}

module.exports = {
  bookingQueries,
  bookingMutations
}
