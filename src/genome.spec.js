'use strict';

const { expect } = require('chai')
const { Genome } = require('./genome.class')

describe('Genome', () => {

  describe('creation', () => {
    it('should create a new Genome with all properties', () => {
      const genome = new Genome()
      expect(genome).to.be.an('object')
      expect(genome).to.have.all.keys('nodeGenes', 'connectionGenes', 'fitness')
    })
  })

  describe('nextInnovationNumber', () => {
    it('should increase next innovation number', () => {
      const genome = new Genome()
      expect(genome.nextInnovationNumber()).to.equal(2)
      // @TODO : Add connection + check next
    })
  })

  describe('possibleNewConnnections', () => {
    it('should create all combinations of possible connection', () => {
      const genome = new Genome()
      expect(genome.possibleNewConnections()).to.be.an('array')
      // @TODO : check
    })
  })
})
