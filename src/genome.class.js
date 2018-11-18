'use strict'

const { NodeGene } = require('./node-gene.class')
const { ConnectionGene } = require('./connection-gene.class')
const { NeuralNetwork } = require('./network.class')
const { getRandomItem } = require('../utils/selecttion')

/**
 * Genome is combination of genes
 * It can be mutated or combined with another genome (crossover)
 *
 */
class Genome {

  /**
   * Create a new Genome
   *
   * @param {number} populationSize     Total size of the chromosomes population
   * @param {number} length             Number of genes in a chromosome
   * @param {Array}  genesPool          Possible genes for a chromosome
   */
  constructor(nodeGenes, connectionGenes) {
    this.nodeGenes = nodeGenes || [new NodeGene(1, 'input'), new NodeGene(2, 'hidden'), new NodeGene(3, 'output')]
    this.connectionGenes = connectionGenes || [new ConnectionGene(1, 2), new ConnectionGene(2, 3)]
    this.fitness = 0
  }

  /**
   * Calculate the id of the next gene
   *
   * @return {Integer} id              Id of the next gene to be created
   */
  nextGeneId() {
    return this.nodeGenes[this.nodeGenes.length-1].id + 1
  }

  /**
   * Evalutate the fitness of genome
   *
   * @param {Function} fitFunction     Fitness function used to score genomes
   * @return {Number} fitness          Fitness score
   */
  possibleNewConnections() {
    const existingConnections = this.connectionGenes.
      .filter(gene => !gene.disabled)
      .map(gene => gene.inputNode+'-'+gene.outputNode)
    const possibleConnections = this.nodeGenes.reduce((acc, input, i) =>
      acc.concat(this.nodeGenes.slice(i+1).map(output => [input.id, output.id] )),
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
    const childNodes = 22
    const childConnections = 22
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
    const newConnection = new ConnectionGene(randomConnection[0], randomConnection[1])
    this.connectionGenes.push(newConnection)
  }

  /**
   * Mutates genome by adding a new node.
   * The connection gene being split is disabled, and two new connection genes are created.
   * The new node is between the two new connections.
   */
  addNode() {
    const randomConnection = getRandomItem(this.connectionGenes().filter(gene => !gene.disabled))
    this.nodeGenes.push(new NodeGene(this.nextGeneId(), 'hidden'))
    this.connectionGenes.push(new ConnectionGene(randomConnection.inputNode, newNode.id))
    this.connectionGenes.push(new ConnectionGene(newNode.id, randomConnection.outputNode))
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

module.exports = { Genome }
