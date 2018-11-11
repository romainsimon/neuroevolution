'use strict';

const { expect } = require('chai')
const { Population } = require('./population.class')

describe('Population', () => {

  describe('creation', () => {

    it('should create a new Population with all properties', () => {
      const population = new Population()
      expect(population).to.be.an('object')
      expect(population).to.have.all.keys('generation', 'populationSize', 'chromosomeLength', 'genesPool', 'currentPopulation')
    })

    it('should create a new Population with generation 0', () => {
      const population = new Population()
      expect(population.generation).to.equal(0)
    })

    it('should create a new Population with population size', () => {
      const size = 18
      const population = new Population(size)
      expect(population.populationSize).to.equal(size)
      expect(population.currentPopulation).to.have.lengthOf(size)
    })

    it('should create a new Population with chromosome length', () => {
      const length = 42
      const population = new Population(5, length)
      for (const chromosome of population.currentPopulation)
        expect(chromosome.dna).to.have.lengthOf(length)
    })

    it('should create a new Population with chromosome having genes from genes pool', () => {
      const genesPool = ['A', 'T', 'G', 'C']
      const population = new Population(5, 21, genesPool)
      for (const chromosome of population.currentPopulation) {
        const genes = chromosome.dna.split('')
        for (const gene of genes)
          expect(gene).to.be.oneOf(genesPool)
      }
    })
  })

  describe('evaluate', () => {

    it('should calculate fitness score for all chromosomes', () => {
      const population = new Population()
      population.evaluate()
      for (const chromosome of population.currentPopulation) {
        expect(chromosome.fitness).to.be.a('number')
        expect(chromosome.fitness).to.be.above(0)
        expect(chromosome.fitness).to.be.below(1)
      }
    })

    it('should calculate fitness score for all chromosomes with custom function', () => {
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

    it('should select only chromosomes with top fitness', () => {
      const population = new Population(100)
      population.evaluate()
      population.select(.1)
      expect(population.currentPopulation.length).to.equal(10)
      expect(population.currentPopulation[0].fitness).be.at.least(population.currentPopulation[9].fitness)
    })

    it('should select chromosomes when no fitness score', () => {
      const population = new Population(100)
      population.select(.1)
      expect(population.currentPopulation.length).to.equal(10)
    })
  })

  describe('reproduce', () => {

    it('should create new children chromosomes in the population', () => {
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
      const population = new Population()
      population.evolve(200)
      expect(population.generation).to.equal(200)
    })

    it('should evolve population with custom fitness function', () => {
      const population = new Population()
      const dumbFitness = () => 0.42
      population.evolve(100, dumbFitness)
      const lastFitness = population.currentPopulation[0].fitness
      expect(lastFitness).to.equal(0.42)
    })

    it('should increase fitness over generations', () => {
      const population = new Population()
      population.evaluate()
      const firstFitness = population.currentPopulation[0].fitness
      population.evolve()
      const lastFitness = population.currentPopulation[0].fitness
      expect(lastFitness).to.be.at.least(firstFitness)
    })

  })

})
