'use strict'

const { getRandomItem } = require('../utils/selection')
const nodeTypes = ['input', 'hidden', 'output']

/**
 * Node gene is part of a genome
 *
 */
class Node {

  /**
   * Create a new Node Gene
   *
   * @param {number} id          Reference id of the node
   * @param {number} outputNode         Reference number of output node
   * @param {number} weight             Weight of gene/connection
   */
  constructor(id, type) {
    if (type && !nodeTypes.includes(type))
      throw new Error('Node type is not valid')
    this.id = id
    this.type = type || getRandomItem(nodeTypes)
  }
}

module.exports = Node
