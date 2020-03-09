const { PlaceListType } = require("../../types")
const Places = require("../../data/places.json")
const { GraphQLString } = require("graphql")

const placeQueries = {
  places: {
    type: PlaceListType,
    args: {
      state: { type: GraphQLString }
    },
    resolve(parent, args) {
      if (args.state) return Places.filter(p => p.state === args.state)
      return Places
    }
  }
}

const placeMutations = {}

module.exports = {
  placeQueries,
  placeMutations
}
