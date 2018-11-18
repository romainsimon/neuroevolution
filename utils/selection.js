'use strict'

/**
 * Returning a random item from an array
 *
 * @return {item} item     a random item from the array
 */
const getRandomItem = (array) => array[Math.floor(Math.random()*array.length)]

module.exports = { getRandomItem }
