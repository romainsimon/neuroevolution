'use strict'

const { Population } = require('../index')
const { showSpecies } = require('../utils/graph')

const fitnessFunction = () => Math.random()

const population = new Population(10, 2, 2, false)

for (let i = 1; i < 30; ++i) {
  population.evolve(1, fitnessFunction)
  showSpecies(population)
}
