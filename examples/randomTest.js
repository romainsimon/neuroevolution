'use strict'

const { Population } = require('../index')

// const fitnessFunction = () => Math.random()
const fitnessFunction = genome => genome.connections.length

const population = new Population(50, 3, 3, true)
for (let i = 1; i < 10; ++i) {
  population.evolve(1000, fitnessFunction)
}
