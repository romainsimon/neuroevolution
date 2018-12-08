'use strict'

const { Node } = require('./node.class')
const { Connection } = require('./connection.class')
const { Network } = require('./network.class')
const { getRandomItem } = require('../utils/selection')

/**
 * Genome is combination of genes
 * It can be mutated or combined with another genome (crossover)
 */
class Genome {
  /**
   * Create a new Genome
   * @param {number}    nbInput      Number of input nodes
   * @param {number}    nbOutput     Number of output nodes
   * @param {Object[]}  nodes        Array of existing nodes
   * @param {Object[]}  connections  Array of existing connections
   */
  constructor (nbInput = 1, nbOutput = 1, nodes, connections) {
    this.nodes = nodes || []
    this.nodeCount = 0
    if (!nodes) {
      for (let i = 0; i < nbInput; ++i) this.nodes.push(new Node(++this.nodeCount, 'input'))
      for (let o = 0; o < nbOutput; ++o) this.nodes.push(new Node(++this.nodeCount, 'output'))
    }
    this.connections = connections || []
    this.nbInput = nbInput
    this.nbOutput = nbOutput
    this.fitness = 0
  }

  /**
   * Shows a text representation of DNA/connections
   * @return {string} DNA respresenting all connections
   */
  dna () {
    return this.connections
      .map(c => `${c.innovationNumber}[${c.inputNode}${c.disabled ? 'X' : '>'}${c.outputNode}]`)
      .join()
  }

  /**
   * Get a node by its innovation number
   * @param {number} number Innovation number
   */
  getLastInnovation () {
    return this.connections.length ? this.connections.reduce((a, b) => a.innovationNumber > b.innovationNumber ? a : b, 0).innovationNumber : 0
  }

  /**
   * Get a node by its innovation number
   * @param {number} number Innovation number
   */
  getNode (number) {
    const node = this.nodes.filter(n => n.innovationNumber === number)
    return node.length ? node[0] : null
  }

  /**
   * Get a connection by its innovation number
   * @param {number} number Innovation number
   */
  getConnection (number) {
    const connection = this.connections.filter(c => c.innovationNumber === number)
    return connection.length ? connection[0] : null
  }

  /**
   * Lists all possible new connections
   * @return {Array} possibleConnections  An array of possible new connections that can be created
   */
  possibleNewConnections () {
    const existingConnections = this.connections
      .filter(conn => !conn.disabled)
      .map(conn => conn.inputNode + '>' + conn.outputNode)

    const possibleConnections = this.nodes.reduce((acc, input, i) =>
      acc.concat(this.nodes.slice(i + 1).map(output => [input.innovationNumber, output.innovationNumber])),
    []).filter(gene => !existingConnections.includes(gene[0] + '>' + gene[1]) &&
      !(gene[0].type === 'input' && gene[1].type === 'input') &&
      !(gene[0].type === 'output' && gene[1].type === 'output'))

    return possibleConnections
  }

  /**
   * Evalutate the fitness of genome
   * @param  {Function} fitFunction Fitness function used to score genomes
   * @return {number}               Fitness score
   */
  calculateFitness (fitFunction) {
    this.fitness = fitFunction(this)
    return this.fitness
  }

  /**
   * Calculates a distance between this genome and another genome
   * @param  {Genome} genomeB Another genome
   * @return {number}         Distance between two genomes
   */
  distance (genomeB) {
    const weights = { excess: 1, disjoint: 1, weight: 0.4 }
    const totalGenes = Math.max(this.connections.length, genomeB.connections.length)
    const N = totalGenes > 20 ? totalGenes : 1

    let nbExcess = 0
    let nbDisjoint = 0
    let nbMatching = 0
    let weightDiff = 0
    let c = 1

    const maxInnovationA = this.getLastInnovation()
    const maxInnovationB = genomeB.getLastInnovation()
    const maxInnovation = Math.max(maxInnovationA, maxInnovationB)

    while (c <= maxInnovation) {
      const aConn = this.getConnection(c)
      const bConn = genomeB.getConnection(c)
      if (aConn && !bConn) {
        if (c > maxInnovationB) nbExcess++
        else nbDisjoint++
      } else if (!aConn && bConn) {
        if (c > maxInnovationA) nbExcess++
        else nbDisjoint++
      } else if (aConn && bConn) {
        nbMatching++
        weightDiff += Math.abs(aConn.weight - bConn.weight)
      }
      c++
    }
    const avgWeightDiff = nbMatching > 0 ? weightDiff / nbMatching : 1
    const distance = weights.excess * nbExcess / N +
      weights.disjoint * nbDisjoint / N +
      weights.weight * avgWeightDiff

    return distance
  }

  /**
   * Creates a child genome.
   * This genome is combined with another one
   * Matching genes are chosen randomly between the two parents
   * Disjoint or excess genes are chosen in the more fit parent
   * @param  {Genome} genomeB Another genome
   * @return {Genome}         Child genome
   */
  crossover (genomeB) {
    const childNodes = []
    const childConnections = []
    let n = 1
    let c = 1
    const maxNode = Math.max(this.nodeCount, genomeB.nodeCount)
    while (n <= maxNode) {
      const aNode = this.getNode(n)
      const bNode = genomeB.getNode(n)
      if (aNode && bNode) { childNodes.push(Math.random() > 0.5 ? aNode : bNode) } else if (aNode && this.fitness > genomeB.fitness) { childNodes.push(aNode) } else if (bNode && this.fitness < genomeB.fitness) { childNodes.push(bNode) } else if (aNode && bNode) { childNodes.push(aNode || bNode) }
      n++
    }
    const maxConnection = Math.max(this.getLastInnovation(), genomeB.getLastInnovation())
    while (c <= maxConnection) {
      const aConn = this.getConnection(c)
      const bConn = genomeB.getConnection(c)
      if (aConn && bConn) { childConnections.push(Math.random() > 0.5 ? aConn : bConn) } else if (aConn && this.fitness > genomeB.fitness) { childConnections.push(aConn) } else if (bConn && this.fitness < genomeB.fitness) { childConnections.push(bConn) } else if (aConn && bConn) { childConnections.push(aConn || bConn) }
      c++
    }
    return new Genome(null, null, childNodes, childConnections)
  }

  /**
   * Mutates genome by structural or non-structural mutation
   *  - Add a new node
   *  - Add a new connection
   *  - Change weight of a connection
   */
  mutate () {
    const mutations = [
      'addConnection',
      'addNode',
      'updateConnectionWeight'
    ]
    this[getRandomItem(mutations)]()
  }

  /**
   * Mutates genome by adding a new connection
   */
  addConnection () {
    const randomConnection = getRandomItem(this.possibleNewConnections())
    if (!randomConnection) return false
    const newConnection = new Connection(randomConnection[0], randomConnection[1])
    this.connections.push(newConnection)
  }

  /**
   * Mutates genome by adding a new node
   * The connection gene being split is disabled, and two new connection genes are created.
   * The new node is between the two new connections.
   */
  addNode () {
    const randomConnection = getRandomItem(this.connections.filter(gene => !gene.disabled))
    if (!randomConnection) { return false }
    const newNode = new Node(++this.nodeCount, 'hidden')
    this.nodes.push(newNode)
    this.connections.push(new Connection(randomConnection.inputNode, newNode.innovationNumber, 1))
    this.connections.push(new Connection(newNode.innovationNumber, randomConnection.outputNode, randomConnection.weight))
    randomConnection.disable()
  }

  /**
   * Mutates genome by updating connection weight
   */
  updateConnectionWeight () {
    if (!this.connections.length) { return false }
    this.connections[Math.floor(Math.random() * this.connections.length)].weight = Math.random()
  }

  /**
   * Generates the corresponding Neural Network
   * @TODO
   */
  generateNetwork () {
    const nbHidden = this.nodes.filter(node => node.type === 'hidden').length
    const network = new Network(this.nbInput, nbHidden, this.nbOutput)
    return network
  }
}

module.exports = { Genome }
