'use strict'

const { Population } = require('../index')
const population = new Population(100, 2, 1, false)
const xor = [
  [[0, 0], 0],
  [[0, 1], 1],
  [[1, 0], 1],
  [[1, 1], 0],
]

let bestScore = 0
const display = (population, score) => {
  if (score <= bestScore) return
  bestScore = score
  console.log(`[Generation ${population.generation}] fitness score = ${score}`)
}

population.evolve(10000, genome => {
  const network = genome.generateNetwork()
  let error = 0;
  let predictions = []
  for (const [input, output] of xor) {
    const [prediction] = network.predict(input)
    error += Math.abs(prediction - output)
    predictions.push(prediction)
  }
  const score = 1 - (error / 4)
  display(population, score)
  return score
})
