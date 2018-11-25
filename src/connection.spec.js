'use strict';

const { expect } = require('chai')
const { Connection } = require('./connection.class')

describe('Connection gene', () => {

  describe('creation', () => {
    it('should create a new Connection Gene with all properties', () => {
      const gene = new Connection(32, 4, 5)
      expect(gene).to.be.an('object')
      expect(gene).to.have.all.keys('inputNode', 'outputNode', 'disabled', 'weight', 'innovationNumber')
      expect(gene.inputNode).to.equal(4)
      expect(gene.outputNode).to.equal(5)
      expect(gene.disabled).to.equal(false)
      expect(gene.weight).to.be.within(0, 1)
      expect(gene.innovationNumber).to.equal(32)
    })
    it('should increase innovation number ', () => {
      const gene1 = new Connection(1, 2, 1)
      const gene2 = new Connection(2, 2, 1)
      expect(gene1.innovationNumber).to.equal(1)
      expect(gene2.innovationNumber).to.equal(2)
    })
    it('should get the same innovation number when copied ', () => {
      const gene1 = new Connection(42, 1, 2)
      const gene2 = gene1
      expect(gene2.innovationNumber).to.equal(42)
    })
    it('should reject node without innovation number', () => {
      expect(() => new Connection(null, 1, 2)).to.throw('Connection should have an innovation number')
    })
    it('should reject node without input or output nodes', () => {
      expect(() => new Connection(42, null, null)).to.throw('Connection should have an input and output node')
    })
  })

  describe('disable', () => {
    it('should disable connection', () => {
      const gene = new Connection(1, 1, 2)
      gene.disable()
      expect(gene.disabled).to.equal(true)
    })
  })

})
