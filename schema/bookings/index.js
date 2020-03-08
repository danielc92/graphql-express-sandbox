const { BookingListType } = require("../../types")
const Bookings = require("../../data/bookings.json")

const bookingQueries = {
  bookings: {
    type: BookingListType,
    resolve(parent, args) {
      return Bookings
    }
  }
}

const bookingMutations = {}

module.exports = {
  bookingQueries,
  bookingMutations
}
