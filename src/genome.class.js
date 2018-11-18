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
   * @param {Array} nodes         Array of nodes
   * @param {Array} connections   Array of connections
   */
  constructor(nodes, connections) {
    this.nodes = nodes || [
      new Node(1, 'input'),
      new Node(2, 'hidden'),
      new Node(3, 'output')
    ]
    this.connections = connections || [
      new Connection(1, 2),
      new Connection(2, 3)
    ]
    this.fitness = 0
  }

  /**
   * Calculate the id of the next gene
   *
   * @return {Integer} id              Id of the next gene to be created
   */
  nextNode() {
    return this.nodes[this.nodes.length-1].id + 1
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
      acc.concat(this.nodes.slice(i+1).map(output => [input.id, output.id] )),
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
    const childNodes = 22 // @TODO
    const childConnections = 22 // @TODO
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
    const randomConnection = getRandomItem(this.connectionGenes().filter(gene => !gene.disabled))
    this.nodes.push(new Node(this.nextNode(), 'hidden'))
    this.connections.push(new ConnectionGene(randomConnection.inputNode, newNode.id))
    this.connections.push(new ConnectionGene(newNode.id, randomConnection.outputNode))
    randomConnection.disable()
  }

  /**
   * Generates the corresponding Neural Network
   *
   * @TODO
   */
  generateNetwork() {
    const network = new NeuralNetwork()
    return network
  }
}

module.exports = Genome
