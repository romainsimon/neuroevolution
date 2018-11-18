'use strict'

const Genome = require('./genome.class')

/**
 * Population is of group of genomes
 *
 */
class Population {

  /**
   * Create a new population of chromosomes
   *
   * @param {number} populationSize     Total size of the genomes population
   */
  constructor(populationSize=10, showLogs=false) {
    this.generation = 0
    this.populationSize = populationSize
    this.showLogs = showLogs
    this.currentPopulation = [...Array(this.populationSize)].map(genome => new Genome())
  }

  /**
   * Evalutate the fitness of entire population according to fitness function
   * Sorts the population from highest fitness score to lowest
   *
   * @param {Function} fitnessFunction     Fitness function used to score chromosomes
   */
  evaluate(fitnessFunction) {
    for (const genome of this.currentPopulation)
      genome.calculateFitness(fitnessFunction)
    this.currentPopulation.sort((geneA, geneB) => geneB.fitness - geneA.fitness)
    if (this.generation % 100 === 0 && this.showLogs) {
      console.log(`  ${this.currentPopulation[0].dna} (${this.currentPopulation[0].fitness})`)
    }
  }

  /**
   * Select the best genomes in the population according to survival rate
   * Kill all other chromosomes (sorry guys)
   *
   * @param {number}   survivalRate     Percent of population that survives [0-1]
   */
  select(survivalRate=.2) {
    const nbSelected = Math.ceil(this.populationSize * survivalRate)
    const newPopulation = []
    for (const i in this.currentPopulation)
      if (i < nbSelected) newPopulation.push(this.currentPopulation[i])
    this.currentPopulation = newPopulation
  }

  /**
   * Reproduce existing genomes in population via crossover
   * Mutates children and adds them to population
   *
   * @param {number}   survivalRate     Percent of population that survives [0-1]
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
   *
   */
  repopulate() {
    const nbToGenerate = this.populationSize - this.currentPopulation.length
    const newGenomes = Array(nbToGenerate).fill('').map(ch => new Genome())
    this.currentPopulation = [...this.currentPopulation, ...newGenomes]
  }

  /**
   * Evolves the population via different steps:
   * selection, crossover, mutation
   *
   * @param {number} iterations     Number of iterations
   */
  evolve(iterations=1000, fitnessFunction=stringDiff) {
    const startGeneration = this.generation
    while (this.generation < startGeneration + iterations) {
      if (this.generation % 100 === 0 && this.showLogs)
        console.log(`- Generation ${this.generation}`)
      this.evaluate(fitnessFunction)
      this.select()
      this.reproduce()
    }
    if (this.showLogs) console.log(`===> Best Genome : ${this.currentPopulation[0]}`)
    return this.currentPopulation[0]
  }
}


module.exports = Population
