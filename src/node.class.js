'use strict'

const nodeTypes = ['input', 'hidden', 'output']

/**
 * Node gene is part of a genome
 */
class Node {
  /**
   * Create a new Node gene
   * @param {number} number  Node number can be set
   * @param {number} type    Type of node created
   */
  constructor (number, type = 'hidden') {
    if (!number) throw new Error('Node should have a node number')
    if (type && !nodeTypes.includes(type)) throw new Error('Node type is not valid')
    this.number = number
    this.type = type
  }
}

module.exports = { Node }
