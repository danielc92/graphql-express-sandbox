const Logs = require("../../data/logs")
const { LogListType } = require("../../types")

const logQueries = {
  logs: {
    type: LogListType,
    resolve(parent, args) {
      return Logs
    }
  }
}

// const logMutations = {}

module.exports = {
  logQueries
  //   logMutations
}
