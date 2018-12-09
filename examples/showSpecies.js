'use strict'

const { Population } = require('../index')
const s = {
  0: '⓿',
  1: '❶',
  2: '❷',
  3: '❸',
  4: '❹',
  5: '❺',
  6: '❻',
  7: '❼',
  8: '❽',
  9: '❾',
  10: '❿',
  11: '⓫',
  12: '⓬',
  13: '⓭',
  14: '⓮',
  15: '⓯',
  16: '⓰',
  17: '⓱',
  18: '⓲',
  19: '⓳',
  20: '⓴'
}

const fitnessFunction = () => Math.random()

const population = new Population(10, 2, 2, false)

for (let i = 1; i < 20; ++i) {
  population.evolve(1, fitnessFunction)
  const nbSpecies = population.species.length
  const tot = population.currentPopulation.length
  let species = ` Gen ${population.generation} - ${nbSpecies} species  `
  for (const i in population.species){
    for (const b in population.species[i]) species += s[i]
    species += '  '
  }
  console.log('-------------------')
  console.log(`${species}`)
}
