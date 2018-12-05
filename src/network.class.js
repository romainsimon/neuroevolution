'use strict'

const tf = require('@tensorflow/tfjs')

/**
 * Neural Network
 * @TODO This does not reflect the structure from genome yet
 */
class Network {
  /**
   * Create a new Neural Network
   * @param {number} nbInput      Number of input neurons
   * @param {number} nbHidden     Number of hidden neurons
   * @param {number} nbOutput     Number of output neurons
   */
  constructor (nbInput, nbHidden, nbOutput) {
    this.nbInput = nbInput
    this.nbHidden = nbHidden
    this.nbOutput = nbOutput
    this.inputWeights = tf.randomNormal([this.nbInput, this.nbHidden])
    this.outputWeights = tf.randomNormal([this.nbHidden, this.nbOutput])
  }

  /**
   * Predict outut from input
   * @param  {Array} input     One hot encoded input
   * @return {Array} output    One hot encoded output
   */
  predict (input) {
    let output
    tf.tidy(() => {
      let inputLayer = tf.tensor(input, [1, this.nbInput])
      let hiddenLayer = inputLayer.matMul(this.inputWeights).sigmoid()
      let outputLayer = hiddenLayer.matMul(this.outputWeights).sigmoid()
      output = outputLayer.dataSync()
    })
    return output
  }

  /**
   * Create a clone a this neural network
   * @return {NeuralNetwork} cloned neural network
   */
  clone () {
    let clone = new Network(this.nbInput, this.nbHidden, this.nbOutput)
    clone.dispose()
    clone.inputWeights = tf.clone(this.inputWeights)
    clone.outputWeights = tf.clone(this.outputWeights)
    return clone
  }

  /**
   * Dispose memory
   */
  dispose () {
    this.inputWeights.dispose()
    this.outputWeights.dispose()
  }
}

module.exports = { Network }
