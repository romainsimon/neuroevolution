'use strict'

const Population = require('../index')

const fitnessFunction = () => Math.random()

const population = new Population(5, true)
population.evolve(3000, fitnessFunction)