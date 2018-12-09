'use strict'

let globalInnovationNumber = 0
let innovations = {}

/**
 * Innovation Generator generates innovation numbers
 * and keeps track of existing innovations
 * This allows historical markings of node/connection genes
 */
class Innovation {
  /**
   * Returns the last innovation number
   * @return {number} number     last innovation number
   */
  getLast () {
    return globalInnovationNumber
  }

  /**
   * Generates an increasing innovation number
   * or returns the existing innovation number for the connection
   * @param  {number} inputNode   Reference number of input node
   * @param  {number} outputNode  Reference number of output node
   * @return {number} number      Innovation number
   */
  getNumber (inputNode, outputNode) {
    if (!inputNode || !Number(inputNode)) throw new Error('You must specify an input node number')
    if (!outputNode || !Number(outputNode)) throw new Error('You must specify an output node number')
    const connection = outputNode > inputNode ? `${inputNode}>${outputNode}` : `${outputNode}>${inputNode}`
    if (!innovations[connection]) {
      ++globalInnovationNumber
      innovations[connection] = globalInnovationNumber
    }
    return innovations[connection]
  }

  /**
   * Reset innovation number to zero
   */
  reset () {
    globalInnovationNumber = 0
    innovations = {}
  }
}

module.exports = { Innovation }
