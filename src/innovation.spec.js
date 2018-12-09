'use strict'

const { expect } = require('chai')
const { Innovation } = require('./innovation.class')

describe('Innovation', () => {
  describe('getNumber', () => {
    it('should throw an error if from node is not present', () => {
      const innovation = new Innovation()
      expect(() => innovation.getNumber()).to.throw('You must specify an input node number')
    })
    it('should throw an error if to node is not present', () => {
      const innovation = new Innovation()
      expect(() => innovation.getNumber(1)).to.throw('You must specify an output node number')
    })
    it('should get an increasing innovation number for different connections', () => {
      const innovation = new Innovation()
      const innovation1 = innovation.getNumber(1, 2)
      const innovation2 = innovation.getNumber(1, 4)
      expect(innovation2).to.be.above(innovation1)
    })
    it('should get the same innovation number for the same connection', () => {
      const innovation = new Innovation()
      const innovation1 = innovation.getNumber(1, 2)
      const innovation2 = innovation.getNumber(1, 2)
      expect(innovation2).to.equal(innovation1)
    })
    it('should get the same innovation number for the same even if inverted', () => {
      const innovation = new Innovation()
      const innovation1 = innovation.getNumber(1, 2)
      const innovation2 = innovation.getNumber(2, 1)
      expect(innovation2).to.equal(innovation1)
    })
  })

  describe('reset', () => {
    it('should reset innovation number generator', () => {
      const innovation = new Innovation()
      innovation.getNumber(1, 2)
      innovation.reset()
      const innovation2 = innovation.getNumber(1, 4)
      expect(innovation2).to.be.equal(1)
    })
  })

  describe('getLast', () => {
    it('should get the last innovation number', () => {
      const innovation = new Innovation()
      innovation.reset()
      innovation.getNumber(1, 2)
      innovation.getNumber(1, 4)
      const last = innovation.getLast()
      expect(last).to.be.equal(2)
    })
  })
})
