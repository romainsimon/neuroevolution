'use strict'

const { getRandomItem } = require('../utils/selection')
const nodeTypes = ['input', 'hidden', 'output']

let currentNumber = 0

/**
 * Node gene is part of a genome
 *
 */
class Node {

  /**
   * Create a new Node gene
   *
   * @param {number} type              Type of node created
   * @param {number} innovationNumber  Innovation number can be set for inital nodes
   */
  constructor(type, innovationNumber) {
    if (type && !nodeTypes.includes(type))
      throw new Error('Node type is not valid')
    if (!innovationNumber) currentNumber++
    this.innovationNumber = currentNumber || innovationNumber
    this.type = type || getRandomItem(nodeTypes)
  }
}

module.exports = Node
