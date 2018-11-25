'use strict'

let lastInnovationNumber = 0

/**
 * Innovation Generator generates innovation numbers
 *
 */
class Innovation {

  /**
   * Create a new Node gene
   *
   * @param {number} innovationNumber   Innovation number can be set
   * @param {number} type   Type of node created
   */
  constructor() {
    return lastInnovationNumber
  }

  /**
   * Returns the last innovation number
   *
   * @return {number} number     last innovation number
   */
  getLast() {
    return lastInnovationNumber
  }

  /**
   * Generates an increasing innovation number
   *
   * @return {number} number     last innovation number
   */
  generate() {
    lastInnovationNumber++
    return lastInnovationNumber
  }

  /**
   * Reset innovation number to zero
   *
   */
  reset() {
    lastInnovationNumber = 0
  }
}

module.exports = { Innovation }
