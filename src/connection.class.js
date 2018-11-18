'use strict'

let lastInnovationNumber = 0

/**
 * Connection gene is part of a genome
 *
 */
class Connection {

  /**
   * Create a new Connection Gene
   *
   * @param {number} inputNode          Reference number of input node
   * @param {number} outputNode         Reference number of output node
   * @param {number} weight             Weight of gene/connection
   */
  constructor(inputNode, outputNode, weight) {
    this.inputNode = inputNode
    this.outputNode = outputNode
    lastInnovationNumber++
    this.innovationNumber = lastInnovationNumber
    this.disabled = false
    this.weight = weight || Math.random()
  }

  /**
   * Disables a gene
   */
  disable() {
    this.disabled = true
  }
}

module.exports = Connection
