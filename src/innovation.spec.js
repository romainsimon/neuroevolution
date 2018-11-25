'use strict';

const { expect } = require('chai')
const { Innovation } = require('./innovation.class')

describe('Innovation', () => {

  describe('generate', () => {
    it('should get an increasing innovation number', () => {
      const innovation = new Innovation()
      const innovation1 = innovation.generate()
      const innovation2 = innovation.generate()
      expect(innovation2).to.be.above(innovation1)
    })
  })

  describe('reset', () => {
    it('should reset innovation number generator', () => {
      const innovation = new Innovation()
      const innovation1 = innovation.generate()
      innovation.reset()
      const innovation2 = innovation.generate()
      expect(innovation2).to.be.equal(1)
    })
  })

  describe('getLast', () => {
    it('should get the last innovation number', () => {
      const innovation = new Innovation()
      innovation.reset()
      innovation.generate()
      innovation.generate()
      const last = innovation.getLast()
      expect(last).to.be.equal(2)
    })
  })

})
