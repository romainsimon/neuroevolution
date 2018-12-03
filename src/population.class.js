'use strict'

const { Genome } = require('./genome.class')
const { getRandomItem } = require('../utils/selection')

/**
 * Population is of group of genomes
 */
class Population {

  /**
   * Create a new population of genomes
   * @param {Number}  populationSize  Total size of the genomes population
   * @param {number}  nbInput         Number of input nodes
   * @param {number}  nbOutput        Number of output node
   * @param {Boolean} showLogs        Will display logs if true
   */
  constructor(populationSize=10, nbInput=1, nbOutput=1, showLogs=false) {
    this.generation = 1
    this.populationSize = populationSize
    this.nbInput = nbInput
    this.nbOutput = nbOutput
    this.showLogs = showLogs
    this.currentPopulation = [...Array(this.populationSize)].map(genome => new Genome(nbInput, nbOutput))
    this.species = [ this.currentPopulation ]
  }

  /**
   * Speciation creates and ordered list of species
   * Two genomes are considered as from the same species
   * if their distance is below the distance threshold
   * @param {number}   threshold     Threshold distance
   */
  speciate(threshold=1) {
    const speciesRepresentation = this.species.map(s => getRandomItem(s))
    this.species = new Array(speciesRepresentation.length).fill([])
    for (const g of this.currentPopulation) {
      for (const i in speciesRepresentation) {
        if (g.distance(speciesRepresentation[i]) <= threshold) {
          this.species[i].push(g)
          break
        }
        if (speciesRepresentation.length - i === 1)
          this.species.push([g])
      }
    }
    this.species = this.species.filter(s => s.length > 0)
    return this.species
  }

  /**
   * Evaluate the fitness of entire population according to fitness function
   * Sorts the population from highest fitness score to lowest
   * @param {Function} fitnessFunction Fitness function used to score genomes
   */
  evaluate(fitnessFunction) {
    for (const genome of this.currentPopulation)
      genome.calculateFitness(fitnessFunction)
    this.currentPopulation.sort((geneA, geneB) => geneB.fitness - geneA.fitness)
  }

  /**
   * Select the best genomes in the population according to survival rate
   * Kills all other genomes (sorry guys)
   * @param {number} survivalRate  Percent of population that survives [0-1]
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
   * This uses explicit fitness sharing to adjust the fitness
   * according to species

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
    const newGenomes = Array(nbToGenerate).fill('').map(genome => new Genome(this.nbInput, this.nbOutput))
    this.currentPopulation = [...this.currentPopulation, ...newGenomes]
  }

  /**
   * Evolves the population via different steps:
   * selection, crossover, mutation
   * @param {number}   iterations       Number of iterations
   * @param {Function} FitnessFunction  Fitness function used for evaluation
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
      console.log(`=> Fittest genome: ${this.currentPopulation[0].dna()} (${this.currentPopulation[0].fitness})`)
    return this.currentPopulation[0]
  }
}

module.exports = { Population }
