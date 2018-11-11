'use strict';

const { expect } = require('chai')
const { Chromosome } = require('./chromosome.class')
const { stringDiff } = require('./fitness')

describe('Fitness', () => {

  describe('stringDiff', () => {

    it('should give a score between 0 and 1', () => {
      const chromosome = new Chromosome()
      const fit = stringDiff(chromosome)
      expect(chromosome).to.be.an('object')
      expect(fit).to.be.above(0)
      expect(fit).to.be.below(1)
    })

  })
})
