'use strict'

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

/**
 * Plots the differents species existing in the population
 * @return {Population} population   Population
 */
const showSpecies = population => {
  let species = ` Gen ${population.generation} - ${population.species.length} species  `
  for (const i in population.species) {
    species += (s[i] ? s[i] : `[${i}]`).repeat(population.species[i].length) + ' '
  }
  console.log(species)
  return species
}

module.exports = { showSpecies }
