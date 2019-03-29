'use strict'

const { Population } = require('../index')

// This fitness function will make genomes grow larger and larger
const fitnessFunction = genome => genome.connections.filter(c => !c.disabled).length

const population = new Population(30, 3, 3)

for (let i = 1; i < 10; ++i) {
  population.evolve(20, fitnessFunction)
}
