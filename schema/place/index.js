const { PlaceListType } = require("../../types")
let Places = require("../../data/places.json")
const { GraphQLID, GraphQLString } = require("graphql")

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

const placeMutations = {
  createPlace: {
    type: PlaceListType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      state: { type: GraphQLString },
      country: { type: GraphQLString }
    },
    resolve(parent, args) {
      const place = {
        id: Places.length + 1,
        owner_id: args.owner_id,
        name: args.name,
        state: args.state,
        country: args.country
      }
      Places = [...Places, place]
      return Places
    }
  }
}

module.exports = {
  placeQueries,
  placeMutations
}
