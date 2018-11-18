'use strict';

const { expect } = require('chai')
const { ConnectionGene } = require('./connection-gene.class')

describe('Gene', () => {

  describe('creation', () => {
    it('should create a new Conection Gene with all properties', () => {
      const gene = new ConnectionGene(4, 5)
      expect(gene).to.be.an('object')
      expect(gene).to.have.all.keys('inputNode', 'outputNode', 'disabled', 'weight', 'innovationNumber')
      expect(gene.inputNode).to.equal(4)
      expect(gene.outputNode).to.equal(5)
      expect(gene.disabled).to.equal(false)
      expect(gene.weight).to.be.within(0, 1)
      expect(gene.innovationNumber).to.equal(1)
    })
    it('should increase innovation', () => {
      const gene1 = new ConnectionGene(1, 2)
      expect(gene1.innovationNumber).to.equal(2)
      const gene2 = new ConnectionGene(1, 2, 2)
      expect(gene2.innovationNumber).to.equal(3)
    })
  })

  describe('disable', () => {
    it('should disabled gene', () => {
      const gene = new ConnectionGene()
      gene.disable()
      expect(gene.disabled).to.equal(true)
    })
  })

})
