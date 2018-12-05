'use strict'

const { expect } = require('chai')
const { Node } = require('./node.class')

describe('Node gene', () => {
  describe('creation', () => {
    it('should create a new Node Gene with all properties', () => {
      const gene = new Node(42, 'input')
      expect(gene).to.be.an('object')
      expect(gene).to.have.all.keys('innovationNumber', 'type')
      expect(gene.type).to.equal('input')
      expect(gene.innovationNumber).to.equal(42)
    })
    it('should reject invalid node type', () => {
      expect(() => new Node(1, 'invalidtype')).to.throw('Node type is not valid')
    })
    it('should reject node without innovation number', () => {
      expect(() => new Node(null, 'input')).to.throw('Node should have an innovation number')
    })
    it('should create new node with hidden type', () => {
      const gene = new Node(2)
      expect(gene.type).to.equal('hidden')
    })
  })
})
