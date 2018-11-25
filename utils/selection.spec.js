'use strict';

const { expect } = require('chai')
const { Node } = require('../src/node.class')
const { getRandomItem } = require('./selection')

describe('Selection', () => {

  describe('getRandomItem', () => {
    it('should get a random number from array', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 10]
      const random = getRandomItem(items)
      expect(random).to.be.a('number')
      expect(random).to.be.within(1, 10)
    })
    it('should get a random string from array', () => {
      const items = ['input', 'hidden', 'output']
      const random = getRandomItem(items)
      expect(random).to.be.oneOf(items)
    })
   it('should get a random item from node', () => {
      const items = [new Node(1, 'input'), new Node(2, 'output')]
      const random = getRandomItem(items)
      expect(random).to.be.an('object')
      expect(random).to.be.oneOf(items)
    })
  })

})
