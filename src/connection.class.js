'use strict'

/**
 * Connection gene is part of a genome
 *
 */
class Connection {

  /**
   * Create a new Connection gene
   *
   * @param {number} innovationNumber   Innovation number can be set
   * @param {number} inputNode          Reference number of input node
   * @param {number} outputNode         Reference number of output node
   * @param {number} weight             Weight of connection [0, 1]
   */
  constructor(innovationNumber, inputNode, outputNode, weight) {
    if (!innovationNumber)
      throw new Error('Connection should have an innovation number')
    if (!inputNode || !outputNode)
      throw new Error('Connection should have an input and output node')
    this.inputNode = inputNode
    this.outputNode = outputNode
    this.innovationNumber = innovationNumber
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

module.exports = { Connection }
