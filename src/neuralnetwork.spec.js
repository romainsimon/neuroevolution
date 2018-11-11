'use strict';

const { expect } = require('chai')
const { NeuralNetwork } = require('./neuralnetwork.class')

describe('Neural Network', () => {

  describe('creation', () => {

    it('should create a new Neural Network with all properties', () => {
      const ann = new NeuralNetwork(1,6,3)
      expect(ann).to.be.an('object')
      expect(ann).to.have.all.keys('nbInput', 'nbHidden', 'nbOutput', 'inputWeights', 'outputWeights')
    })
  })

  describe('creation', () => {

    it('should predict an output from input', () => {
      const ann = new NeuralNetwork(1,1,2)
      const input = [Math.random()]
      const output = ann.predict(input)
      expect(output).to.be.have.lengthOf(2)
      expect(output[0]).to.be.within(0, 1)
    })
  })

  describe('clone', () => {

    it('should clone neural network', () => {
      const ann1 = new NeuralNetwork(3,4,5)
      const ann2 = ann1.clone()
      expect(ann2).to.be.an('object')
      expect(ann2).to.have.all.keys('nbInput', 'nbHidden', 'nbOutput', 'inputWeights', 'outputWeights')
      expect(ann2.nbInput).to.equal(ann1.nbInput)
      expect(ann2.nbHidden).to.equal(ann1.nbHidden)
      expect(ann2.nbOutput).to.equal(ann1.nbOutput)
    })
  })

  describe('dispose', () => {

    it('should dispose input and output weights', () => {
      const ann = new NeuralNetwork(3,4,5)
      expect(ann.inputWeights.isDisposedInternal).to.equal(false)
      expect(ann.outputWeights.isDisposedInternal).to.equal(false)
      ann.dispose()
      expect(ann).to.be.an('object')
      expect(ann).to.have.all.keys('nbInput', 'nbHidden', 'nbOutput', 'inputWeights', 'outputWeights')
      expect(ann.inputWeights.isDisposedInternal).to.equal(true)
      expect(ann.outputWeights.isDisposedInternal).to.equal(true)
    })
  })


})
