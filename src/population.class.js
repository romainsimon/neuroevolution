'use strict'

const { Genome } = require('./genome.class')

/**
 * Population is of group of genomes
 *
 */
class Population {

  /**
   * Create a new population of genomes
   *
   * @param {Number} populationSize     Total size of the genomes population
   * @param {Boolean} showLogs          Will display logs if true
   */
  constructor(populationSize=10, showLogs=false) {
    this.generation = 1
    this.populationSize = populationSize
    this.showLogs = showLogs
    this.currentPopulation = [...Array(this.populationSize)].map(genome => new Genome())
  }

  /**
   * Evalutate the fitness of entire population according to fitness function
   * Sorts the population from highest fitness score to lowest
   *
   * @param {Function} fitnessFunction     Fitness function used to score genomes
   */
  evaluate(fitnessFunction) {
    for (const genome of this.currentPopulation)
      genome.calculateFitness(fitnessFunction)
    this.currentPopulation.sort((geneA, geneB) => geneB.fitness - geneA.fitness)
    // if (this.generation % 10 === 0 && this.showLogs) {
    //   console.log(`  ${this.currentPopulation[0].dna()} (${this.currentPopulation[0].fitness})`)
    //}
  }

  /**
   * Calculates a distance between two genomes
   *
   * @param  {Genome} genomeA    A genome
   * @param  {Genome} genomeB    Another genome
   * @return {Number} distance   Child genome
   */
  distance(genomeA, genomeB) {
    const weights = { excess: 1, disjoint: 1, weight: 1 }
    const totalGenes = Math.max(genomeA.connections.length, genomeB.connections.length)
    const N = totalGenes > 20 ? totalGenes : 1

    let nbExcess = 0
    let nbDisjoint = 0
    let avgWeightDiff = 0

    const distance = weights.excess*nbExcess/N
      + weights.disjoint*nbDisjoint/N
      + weights.weight*avgWeightDiff

    return distance
  }

  /**
   * Select the best genomes in the population according to survival rate
   * Kill all other genomes (sorry guys)
   *
   * @param {number}   survivalRate     Percent of population that survives [0-1]
   */
  select(survivalRate=.2) {

    // @TODO : Add speciation in selection using distance

    const nbSelected = Math.ceil(this.populationSize * survivalRate)
    const newPopulation = []
    for (const i in this.currentPopulation)
      if (i < nbSelected) newPopulation.push(this.currentPopulation[i])
    this.currentPopulation = newPopulation
  }

  /**
   * Reproduce existing genomes in population via crossover
   * Mutates children and adds them to population
   */
  reproduce() {
    const children = []
    for (let i=0; i<this.currentPopulation.length; i++) {
      for (let j=i+1; j<this.currentPopulation.length; j++) {
        const parentA = this.currentPopulation[i]
        const parentB = this.currentPopulation[j]
        const child = parentA.crossover(parentB)
        child.mutate()
        children.push(child)
      }
    }
    this.generation++
    this.currentPopulation = [...this.currentPopulation, ...children]
  }

  /**
   * Create new random genomes to match the max population size
   * It does not do crossover or mutation, but simply repopulates
   */
  repopulate() {
    const nbToGenerate = this.populationSize - this.currentPopulation.length
    const newGenomes = Array(nbToGenerate).fill('').map(genome => new Genome())
    this.currentPopulation = [...this.currentPopulation, ...newGenomes]
  }

  /**
   * Evolves the population via different steps:
   * selection, crossover, mutation
   *
   * @param {number} iterations     Number of iterations
   */
  evolve(iterations=1000, fitnessFunction) {
    const startGeneration = this.generation
    const maxGen = startGeneration + iterations - 1
    while (this.generation <= maxGen) {
      if (this.showLogs)
        process.stdout.write(`- Generation ${this.generation}/${maxGen}${this.generation === maxGen ?  '\n' : '\r'}`)
      this.evaluate(fitnessFunction)
      this.select()
      this.reproduce()
    }
    if (this.showLogs)
      console.log(`=> Fitest genome: ${this.currentPopulation[0].dna()} (${this.currentPopulation[0].fitness})`)
    return this.currentPopulation[0]
  }
}

module.exports = { Population }
