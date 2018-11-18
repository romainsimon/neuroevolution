'use strict'

let currentNumber = 0

/**
 * Connection gene is part of a genome
 *
 */
class Connection {

  /**
   * Create a new Connection gene
   *
   * @param {number} inputNode          Reference number of input node
   * @param {number} outputNode         Reference number of output node
   * @param {number} innovationNumber   Innovation number can be set for initial connections
   * @param {number} weight             Weight of gene/connection
   */
  constructor(inputNode, outputNode, innovationNumber, weight) {
    this.inputNode = inputNode
    this.outputNode = outputNode
    if (!innovationNumber) currentNumber++
    this.innovationNumber = innovationNumber || currentNumber
    this.disabled = false
    this.weight = weight || Math.random()
  }

  /**
   * Disables a connection gene
   */
  disable() {
    this.disabled = true
  }
}

module.exports = Connection
