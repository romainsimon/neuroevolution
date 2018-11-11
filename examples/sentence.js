'use strict'

const { Population } = require('../index')

const alphabet = [ ' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]
const target = 'I AM A ROBOT AND I LIKE TO EAT BOLTS'

const fitnessFunction = chromosome => {
  return chromosome.dna.split('')
    .reduce((acc, current, i) => acc + (current === target[i] ? 1 : 0), 0) / target.length
}

const population = new Population(30, target.length, alphabet)
population.evolve(1200, fitnessFunction)
