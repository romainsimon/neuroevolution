'use strict'

const { Population } = require('../index')

//const fitnessFunction = () => Math.random()
const fitnessFunction = genome => genome.connections.length


const population = new Population(5, true)
population.evolve(10000, fitnessFunction)
population.evolve(10000, fitnessFunction)
population.evolve(10000, fitnessFunction)
population.evolve(10000, fitnessFunction)
