'use strict'

const { expect } = require('chai')
const { Connection } = require('./connection.class')

describe('Connection gene', () => {
  describe('creation', () => {
    it('should create a new Connection Gene with all properties', () => {
      const gene = new Connection(4, 5)
      expect(gene).to.be.an('object')
      expect(gene).to.have.all.keys('inputNode', 'outputNode', 'disabled', 'weight', 'innovationNumber')
      expect(gene.inputNode).to.equal(4)
      expect(gene.outputNode).to.equal(5)
      expect(gene.disabled).to.equal(false)
      expect(gene.weight).to.be.within(0, 1)
      expect(gene.innovationNumber).to.equal(1)
    })
    it('should increase innovation number from new connections', () => {
      const gene1 = new Connection(1, 4)
      const gene2 = new Connection(1, 8)
      expect(gene2.innovationNumber).to.be.above(gene1.innovationNumber)
    })
    it('should generate the same innovation number for the same connection', () => {
      const gene1 = new Connection(2, 8)
      const gene2 = new Connection(2, 8)
      expect(gene2.innovationNumber).to.equal(gene1.innovationNumber)
    })
    it('should get the same innovation number when copied ', () => {
      const gene1 = new Connection(1, 2)
      const gene2 = gene1
      expect(gene2.innovationNumber).to.equal(gene1.innovationNumber)
    })
    it('should reject node without input or output nodes', () => {
      expect(() => new Connection(null, null)).to.throw('Connection should have an input and output node')
    })
  })

  describe('disable', () => {
    it('should disable connection', () => {
      const gene = new Connection(1, 2)
      gene.disable()
      expect(gene.disabled).to.equal(true)
    })
  })
})
