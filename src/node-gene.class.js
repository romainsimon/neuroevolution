'use strict'

const { getRandomItem } = require('../utils/selecttion')
const nodeTypes = ['input', 'hidden', 'output']

/**
 * Node Gene is part of a genome
 *
 */
class NodeGene {

  /**
   * Create a new Node Gene
   *
   * @param {number} id          Reference id of the node
   * @param {number} outputNode         Reference number of output node
   * @param {number} weight             Weight of gene/connection
   */
  constructor(id, type) {
    if (type && noteTypes.includes(type))
      throw new Error('Node type is not valid')
    this.id = id
    this.type = type || getRandomItem(nodeTypes)
  }
}

module.exports = { NodeGene }
