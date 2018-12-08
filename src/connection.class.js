'use strict'

const { Innovation } = require('./innovation.class')
const innovation = new Innovation()

/**
 * Connection gene is part of a genome
 */
class Connection {
  /**
   * Create a new Connection gene
   * @param {number} inputNode          Reference number of input node
   * @param {number} outputNode         Reference number of output node
   * @param {number} weight             Weight of connection [0, 1]
   */
  constructor (inputNode, outputNode, weight) {
    if (!inputNode || !outputNode) throw new Error('Connection should have an input and output node')
    this.inputNode = inputNode
    this.outputNode = outputNode
    this.innovationNumber = innovation.getNumber(inputNode, outputNode)
    this.disabled = false
    this.weight = weight || Math.random()
  }

  /**
   * Disable a connection gene
   */
  disable () {
    this.disabled = true
  }
}

module.exports = { Connection }
