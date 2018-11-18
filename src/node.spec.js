'use strict';

const { expect } = require('chai')
const Node = require('./node.class')

describe('Node gene', () => {

  describe('creation', () => {
    it('should create a new Node Gene with all properties', () => {
      const gene = new Node('input')
      expect(gene).to.be.an('object')
      expect(gene).to.have.all.keys('innovationNumber', 'type')
      expect(gene.type).to.equal('input')
    })
    it('should reject invalid node type', () => {
      expect(() => new Node('invalidtype')).to.throw('Node type is not valid')
    })
  })

})
