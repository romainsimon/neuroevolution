'use strict';

const { expect } = require('chai')
const { NodeGene } = require('./node-gene.class')

describe('Gene', () => {

  describe('creation', () => {
    it('should create a new Node Gene with all properties', () => {
      const gene = new NodeGene(22, 'input')
      expect(gene).to.be.an('object')
      expect(gene).to.have.all.keys('id', 'type')
      expect(gene.type).to.equal('input')
    })
    it('should reject invalid node type', () => {
      const gene = new NodeGene(1, 'invalidtype')
      // @TODO
    })
  })

})
