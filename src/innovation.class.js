'use strict'

let globalInnovationNumber = 0
let innovations = {}

/**
 * Innovation Generator generates innovation numbers
 * and keeps track of existing innovations
 * This allows historical markings of node/connection genes
 */
class Innovation {
  /**
   * Returns the last innovation number
   * @return {number} number     last innovation number
   */
  getLast () {
    return globalInnovationNumber
  }

  /**
   * Generates an increasing innovation number
   * or returns the existing innovation number for the connection
   * @param  {number} from       Reference number of input node
   * @param  {number} to         Reference number of output node
   * @return {number} number     Innovation number
   */
  getNumber (from, to) {
    if (!from || !Number(from)) throw new Error('You must specify a `from` node number')
    if (!to || !Number(to)) throw new Error('You must specify a `to` node number')
    const connection = to > from ? `${from}>${to}` : `${to}>${from}`
    if (!innovations[connection]) {
      ++globalInnovationNumber
      innovations[connection] = globalInnovationNumber
    }
    return innovations[connection]
  }

  /**
   * Reset innovation number to zero
   */
  reset () {
    globalInnovationNumber = 0
    innovations = {}
  }
}

module.exports = { Innovation }
