'use strict'

const Node = require('./node.class')
const Connection = require('./connection.class')
const NeuralNetwork = require('./network.class')
const { getRandomItem } = require('../utils/selection')

/**
 * Genome is combination of genes
 * It can be mutated or combined with another genome (crossover)
 *
 */
class Genome {

  /**
   * Create a new Genome
   *
   * @param {Number} nbInput      Number of input nodes
   * @param {Number} nbOutput     Number of output nodes
   * @param {Array} nodes         Array of existing nodes
   * @param {Array} connections   Array of existing connections
   */
  constructor(nbInput=1, nbOutput=1, nodes, connections) {
    this.nodes = nodes || [
      ...Array(nbInput).fill(new Node('input')),
      ...Array(nbOutput).fill(new Node('output'))
    ]
    this.connections = connections || []
    this.fitness = 0
  }

  /**
   * Shows a text representation of DNA/connections
   *
   * @return {String} dna   DNA respresenting all connections
   */
  dna() {
    return this.connections
      .map(c => `${c.innovationNumber}[${c.inputNode}${c.disabled?'X':'>'}${c.outputNode}]`)
      .join()
  }

  /**
   * Get a node by its innovation number
   *
   * @param {number} number     Innovation number
   */
  getNode(number) {
    const node = this.nodes.filter(n => n.innovationNumber === number)
    return node.length ? node[0] : null
  }

  /**
   * Get a connection by its innovation number
   *
   * @param {number} number     Innovation number
   */
  getConnection(number) {
    const connection = this.connections.filter(n => n.innovationNumber === number)
    return connection.length ? connection[0] : null
  }

  /**
   * Evalutate the fitness of genome
   *
   * @param {Function} fitFunction     Fitness function used to score genomes
   * @return {Number} fitness          Fitness score
   */
  possibleNewConnections() {
    const existingConnections = this.connections
      .filter(conn => !conn.disabled)
      .map(conn => conn.inputNode+'-'+conn.outputNode)
    const possibleConnections = this.nodes.reduce((acc, input, i) =>
      acc.concat(this.nodes.slice(i+1).map(output => [input.innovationNumber, output.innovationNumber] )),
    []).filter(gene => !existingConnections.includes(gene[0]+'-'+gene[1]))
    return possibleConnections
  }

  /**
   * Evalutate the fitness of genome
   *
   * @param {Function} fitFunction     Fitness function used to score genomes
   * @return {Number} fitness          Fitness score
   */
  calculateFitness(fitFunction) {
    this.fitness = fitFunction(this)
    return this.fitness
  }

  /**
   * Creates a child genome.
   * This genome is combined with another one
   * Matching genes are chosen randomly between the two parents
   * Disjoint or excess genes are chosen in the more fit parent
   *
   * @param {Genome} genomeB    Another genome
   * @return {Genome} child     Child genome
   */
  crossover(genomeB) {
    const childNodes = []
    const childConnections = []
    let n = 1
    let c = 1
    while (this.getNode(n) || genomeB.getNode(n)) {
      const aNode = this.getNode(n)
      const bNode = genomeB.getNode(n)
      if (aNode && bNode)
        childNodes.push(Math.random() > .5 ? aNode : bNode)
      else if (aNode && this.fitness > genomeB.fitness)
        childNodes.push(aNode)
      else if (bNode && this.fitness < genomeB.fitness)
        childNodes.push(bNode)
      else
        childNodes.push(aNode || bNode)
      n++
    }
    while (this.getConnection(c) || genomeB.getConnection(c)) {
      const aConn = this.getConnection(c)
      const bConn = genomeB.getConnection(c)
      if (aConn && bConn)
        childConnections.push(Math.random() > .5 ? aConn : bConn)
      else if (aConn && this.fitness > genomeB.fitness)
        childConnections.push(aConn)
      else if (bConn && this.fitness < genomeB.fitness)
        childConnections.push(bConn)
      else
        childConnections.push(aConn || bConn)
      c++
    }
    return new Genome(childNodes, childConnections)
  }

  /**
   * Mutates genome by either adding a node or connection
   *
   * @param {number} nodeChance    Chance of the mutation being a new node
   */
  mutate(nodeChance=.5) {
    Math.random() >= nodeChance ? this.addNode() : this.addConnection()
  }

  /**
   * Mutates genome by adding a new connection.
   */
  addConnection() {
    const randomConnection = getRandomItem(this.possibleNewConnections())
    const newConnection = new Connection(randomConnection[0], randomConnection[1])
    this.connections.push(newConnection)
  }

  /**
   * Mutates genome by adding a new node.
   * The connection gene being split is disabled, and two new connection genes are created.
   * The new node is between the two new connections.
   */
  addNode() {
    const randomConnection = getRandomItem(this.connections.filter(gene => !gene.disabled))
    console.log(this.connections)
    const newNode = new Node('hidden')
    this.nodes.push(newNode)
    this.connections.push(new Connection(randomConnection.inputNode, newNode.innovationNumber))
    this.connections.push(new Connection(newNode.innovationNumber, randomConnection.outputNode))
    randomConnection.disable()
  }

  /**
   * Generates the corresponding Neural Network
   *
   * @TODO
   */
  generateNetwork() {
    const network = new Network()
    return network
  }
}

module.exports = Genome
