'use strict'

const { Population } = require('../index')

// const fitnessFunction = () => Math.random()
const fitnessFunction = genome => genome.connections.length

const population = new Population(10, 3, 3, true)
console.log(`${population.species.length} species`)
population.evolve(10000, fitnessFunction)
console.log(`${population.species.length} species`)
console.log(population)

population.evolve(10000, fitnessFunction)
console.log(`${population.species.length} species`)
console.log(population)

population.evolve(10000, fitnessFunction)
console.log(`${population.species.length} species`)
console.log(population)

population.evolve(10000, fitnessFunction)
console.log(`${population.species.length} species`)
console.log(population)
