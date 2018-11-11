'use strict'

/**
 * Stupid fitness function that makes string comparison
 * This has no utility other than testing
 *
 * @param {string} chromosome   Mutated chromosome
 */
const stringDiff = (chromosome, expected='10101010101010101010') => {
  return chromosome.dna.split('')
    .reduce((acc, current, i) => acc + (current === expected[i] ? 1 : 0), 0) / expected.length
}

module.exports = { stringDiff }
