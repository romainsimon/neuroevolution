'use strict';

const { expect } = require('chai')
const { Gene } = require('./gene.class')

describe('Gene', () => {

  describe('creation', () => {
    it('should create a new Gene with all properties', () => {
      const gene = new Gene(4, 5)
      expect(gene).to.be.an('object')
      expect(gene).to.have.all.keys('inputNode', 'outputNode', 'disabled', 'weight', 'innovationNumber')
      expect(gene.inputNode).to.equal(4)
      expect(gene.outputNode).to.equal(5)
      expect(gene.disabled).to.equal(false)
      expect(gene.weight).to.be.within(0, 1)
      expect(gene.innovationNumber).to.equal(1)
    })
    it('should increase innovation', () => {
      const gene1 = new Gene(1, 2)
      expect(gene1.innovationNumber).to.equal(2)
      const gene2 = new Gene(1, 2)
      expect(gene2.innovationNumber).to.equal(3)
    })
  })

  describe('disable', () => {
    it('should disabled gene', () => {
      const gene = new Gene()
      gene.disable()
      expect(gene.disabled).to.equal(true)
    })
  })

})
