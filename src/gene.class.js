'use strict'

let lastInnovationNumber = 0;

/**
 * Gene is part of a genome
 *
 */
class Gene {

  /**
   * Create a new Gene
   *
   * @param {number} inputNode          Reference number of input node
   * @param {number} outputNode         Reference number of output node
   * @param {number} weight             Weight of gene/connection
   */
  constructor(inputNode, outputNode, weight) {
    lastInnovationNumber++
    this.inputNode = inputNode
    this.outputNode = outputNode
    this.innovationNumber = lastInnovationNumber
    this.disabled = false;
    this.weight = weight || Math.random()
  }

  /**
   * Disables a gene
   */
  disable() {
    this.disabled = true
  }
}

module.exports = { Gene }
