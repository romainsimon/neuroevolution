'use strict';

const { expect } = require('chai')
const { Chromosome } = require('./chromosome.class')

describe('Chromosome', () => {

  describe('creation', () => {

    it('should create a new Chromosome with all properties', () => {
      const chromosome = new Chromosome()
      expect(chromosome).to.be.an('object')
      expect(chromosome).to.have.all.keys('length', 'genesPool', 'dna', 'fitness')
    })

    it('should create a new Chromosome with the right dna length', () => {
      const chromosome = new Chromosome(13)
      expect(chromosome.dna).to.have.lengthOf(13)
    })

    it('should create a new Chromosome with the gene from pool with characters', () => {
      const genesPool = ['A', 'B', 'C']
      const chromosome = new Chromosome(13, genesPool)
      const genes = chromosome.dna.split('')
      for (const gene of genes)
        expect(gene).to.be.oneOf(genesPool)
    })

    it('should create a new Chromosome with the gene from pool with numbers', () => {
      const genesPool = [1, 2, 8, 9]
      const chromosome = new Chromosome(13, genesPool)
      const genes = chromosome.dna.split('')
      for (const gene of genes)
        expect(Number(gene)).to.be.oneOf(genesPool)
    })
  })

  describe('fitness', () => {

    it('should evalutate fitness wth given function', () => {
      const fitFunction = chromosome => .743
      const chromosome = new Chromosome()
      const fit = chromosome.calculateFitness(fitFunction)
      expect(fit).to.equal(.743)
      expect(chromosome.fitness).to.equal(.743)
    })
  })

  describe('crossover', () => {

    it('should create a child chromosome with all properties', () => {
      const parentA = new Chromosome()
      const parentB = new Chromosome()
      const child = parentA.crossover(parentB)
      expect(child).to.have.all.keys('length', 'genesPool', 'dna', 'fitness')
    })

    it('should create a child chromosome with the right dna length', () => {
      const length = 13;
      const parentA = new Chromosome(length)
      const parentB = new Chromosome(length)
      const child = parentA.crossover(parentB)
      expect(child.dna.length).to.equal(length)
    })

    it('should create a child chromosome with the right genes from pool characters', () => {
      const genesPool = ['X', 'Y', 'Z']
      const parentA = new Chromosome(10, genesPool)
      const parentB = new Chromosome(10, genesPool)
      const child = parentA.crossover(parentB)
      const genes = child.dna.split('')
      for (const gene of genes)
        expect(gene).to.be.oneOf(genesPool)
    })

    it('should create a child chromosome with the right genes from pool numbers', () => {
      const genesPool = [0, 1, 2, 3]
      const parentA = new Chromosome(10, genesPool)
      const parentB = new Chromosome(10, genesPool)
      const child = parentA.crossover(parentB)
      const genes = child.dna.split('')
      for (const gene of genes)
        expect(Number(gene)).to.be.oneOf(genesPool)
    })
  })

  describe('mutation', () => {

    it('should preserve dna length', () => {
      const chromosome = new Chromosome(22)
      chromosome.mutate()
      expect(chromosome.dna).to.have.lengthOf(22)
    })

   it('should preserve genes composition', () => {
      const genesPool = [1, 2, 3, 4, 5]
      const chromosome = new Chromosome(23, genesPool)
      chromosome.mutate()
      const genes = chromosome.dna.split('')
      for (const gene of genes)
        expect(Number(gene)).to.be.oneOf(genesPool)
    })

    it('should not mutate any gene if chance is 0', () => {
      const chromosome = new Chromosome()
      const oldDNA = chromosome.dna
      chromosome.mutate(0)
      expect(chromosome.dna).to.equal(oldDNA)
    })

    it('should mutate ~50% of genes if chance is .5', () => {
      const genesPool = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
      const chromosome = new Chromosome(1000, genesPool)
      const oldGenes = chromosome.dna.split('')
      chromosome.mutate(0.5)
      const newGenes = chromosome.dna.split('')
      let nbMutated = 0
      for (const i in newGenes)
        if (newGenes[i] !== oldGenes[i]) nbMutated++
      const percentMutated = nbMutated/newGenes.length
      expect(percentMutated).to.be.above(.43)
      expect(percentMutated).to.be.below(.58)
    })

  })
})
