'use strict'

let globalInnovationNumber = 0

/**
 * Innovation Generator generates innovation numbers
 * This allows historical markings of node/connection genes
 */
class Innovation {

  /**
   * Create a new Innovation Generator
   * @returns {number} globalInnovationNumber   Innovation number
   */
  constructor() {
    return globalInnovationNumber
  }

  /**
   * Returns the last innovation number
   * @return {number} number     last innovation number
   */
  getLast() {
    return globalInnovationNumber
  }

  /**
   * Generates an increasing innovation number
   * @return {number} number     last innovation number
   */
  generate() {
    globalInnovationNumber++
    return globalInnovationNumber
  }

  /**
   * Reset innovation number to zero
   */
  reset() {
    globalInnovationNumber = 0
  }
}

module.exports = { Innovation }
