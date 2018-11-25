'use strict'

const nodeTypes = ['input', 'hidden', 'output']
let lastNodeNumber = 0

/**
 * Node gene is part of a genome
 *
 */
class Node {

  /**
   * Create a new Node gene
   *
   * @param {number} type   Type of node created
   */
  constructor(type='hidden', innovationNumber) {
    if (type && !nodeTypes.includes(type))
      throw new Error('Node type is not valid')
    if (!innovationNumber) lastNodeNumber++
    this.innovationNumber = innovationNumber || lastNodeNumber
    this.type = type
  }
}

module.exports = { Node, lastNodeNumber }
