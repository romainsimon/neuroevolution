'use strict'

const { Chromosome } = require('./chromosome.class')
const { stringDiff } = require('./fitness')

/**
 * Population is of group of chromosomes
 *
 */
class Population {

  /**
   * Create a new population of chromosomes
   *
   * @param {number} populationSize     Total size of the chromosomes population
   * @param {number} chromosomeLength   Number of genes in a chromosome
   * @param {Array}  genesPool          Possible genes for a chromosome
   */
  constructor(populationSize=10, chromosomeLength=20, genesPool=[0,1]) {
    this.generation = 0
    this.populationSize = populationSize
    this.chromosomeLength = chromosomeLength
    this.genesPool = genesPool
    this.currentPopulation = [...Array(this.populationSize)]
      .map(chromosome => new Chromosome(chromosomeLength, genesPool))
  }

  /**
   * Evalutate the fitness of entire population according to fitness function
   * Sorts the population from highest fitness score to lowest
   *
   * @param {Function} fitnessFunction     Fitness function used to score chromosomes
   */
  evaluate(fitnessFunction=stringDiff) {
    for (const chromosome of this.currentPopulation)
      chromosome.calculateFitness(fitnessFunction)
    this.currentPopulation.sort((chA,chB) => chB.fitness - chA.fitness)
    if (this.generation % 100 === 0) {
      console.log(`  ${this.currentPopulation[0].dna} (${this.currentPopulation[0].fitness})`)
    }
  }

  /**
   * Select the best chromosomes in the population according to survival rate
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
   * Reproduce existing chromosomes in population via crossover
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
   * Create new random chromosomes to match the max population size
   * It does not do crossover or mutation, but simply repopulates
   *
   */
  repopulate() {
    const nbToGenerate = this.populationSize - this.currentPopulation.length
    const newChromosomes = Array(nbToGenerate).fill('').map(ch => new Chromosome().dna)
    this.currentPopulation = [...this.currentPopulation, ...newChromosomes]
  }

  /**
   * Evolves the population via different steps:
   * selection, crossover, mutation
   *
   * @param {number} iterations     Number of iterations
   */
  evolve(iterations=1000, fitnessFunction=stringDiff) {
    while (this.generation<iterations) {
      if (this.generation % 100 === 0) console.log(`- Generation ${this.generation}`)
      this.evaluate(fitnessFunction)
      this.select()
      this.reproduce()
    }
    console.log(`===> Best Chromosome: ${this.currentPopulation[0].dna}`)
    return this.currentPopulation[0]
  }
}


module.exports = { Population }
