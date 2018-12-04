'use strict'

const { expect } = require('chai')
const { Population } = require('./population.class')

describe('Population', () => {

  describe('creation', () => {

    it('should create a new Population with all properties', () => {
      const population = new Population()
      expect(population).to.be.an('object')
      expect(population).to.have.all.keys('generation', 'nbInput', 'nbOutput', 'species', 'populationSize', 'showLogs', 'currentPopulation')
    })

    it('should create a new Population with generation 1', () => {
      const population = new Population()
      expect(population.generation).to.equal(1)
    })

    it('should create a new Population with population size', () => {
      const size = 18
      const population = new Population(size)
      expect(population.populationSize).to.equal(size)
      expect(population.currentPopulation).to.have.lengthOf(size)
    })
  })

  describe('speciate', () => {

    it('should create an initial species with all population', () => {
      const population = new Population(20, 3, 4)
      expect(population.species).to.have.lengthOf(1)
      expect(population.species[0]).to.have.lengthOf(20)
    })

    it('should group similar genomes into the same species', () => {
      const population = new Population(20, 3, 4)
      population.speciate(2)
      expect(population.species).to.have.lengthOf(1)
      expect(population.species[0]).to.have.lengthOf(20)
    })

    it('should create new species when threshold is too low', () => {
      const population = new Population(20, 3, 4)
      population.speciate(.2)
      expect(population.species).to.have.lengthOf(20)
    })
  })

  describe('evaluate', () => {

    it('should calculate fitness score for all genomes', () => {
      const population = new Population()
      const dumbFitness = () => 0.42
      population.evaluate(dumbFitness)
      for (const chromosome of population.currentPopulation) {
        expect(chromosome.fitness).to.be.a('number')
        expect(chromosome.fitness).to.equal(0.42)
      }
    })

  })

  describe('select', () => {

    it('should select only genomes with top fitness', () => {
      const population = new Population(100)
      const dumbFitness = () => Math.random()
      population.evaluate(dumbFitness)
      population.select(.1)
      expect(population.currentPopulation.length).to.equal(10)
      // expect(population.currentPopulation[0].fitness).be.at.least(population.currentPopulation[9].fitness)
    })

    it('should select genomes when no fitness score', () => {
      const population = new Population(100)
      population.select(.1)
      expect(population.currentPopulation.length).to.equal(10)
    })
  })

  describe('reproduce', () => {

    it('should create new children genomes in the population', () => {
      const population = new Population(5)
      population.reproduce()
      expect(population.currentPopulation.length).to.equal(5+4+3+2+1)
    })
  })

  describe('repopulate', () => {

    it('should repopulate with new chromosomes', () => {
      const population = new Population(50)
      population.select(.1)
      population.repopulate()
      expect(population.currentPopulation.length).to.equal(50)
    })
  })

  describe('evolve', () => {

    it('should evolve population to target generation', () => {
      const dumbFitness = () => Math.random()
      const population = new Population()
      population.evolve(20, dumbFitness)
      expect(population.generation).to.equal(21)
      population.evolve(20, dumbFitness)
      expect(population.generation).to.equal(41)
    })

    it.skip('should increase fitness over generations', () => {
      const generationFitness = pop => pop.generation()
      const population = new Population()
      population.evaluate(100, generationFitness)
      const firstFitness = population.currentPopulation[0].fitness
      population.evolve(300, generationFitness)
      const lastFitness = population.currentPopulation[0].fitness
      expect(lastFitness).to.be.at.least(firstFitness)
    })

  })

})
