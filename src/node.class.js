'use strict'

const nodeTypes = ['input', 'hidden', 'output']

/**
 * Node gene is part of a genome
 */
class Node {

  /**
   * Create a new Node gene
   * @param {number} innovationNumber Innovation number can be set
   * @param {number} type             Type of node created
   */
  constructor(innovationNumber, type='hidden') {
    if (!innovationNumber)
      throw new Error('Node should have an innovation number')
    if (type && !nodeTypes.includes(type))
      throw new Error('Node type is not valid')
    this.innovationNumber = innovationNumber
    this.type = type
  }
}

module.exports = { Node }
