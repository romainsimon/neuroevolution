<h1 align="center">Genetic Algorithm</h1>

<div align="center">
  A naive try at creating a genetic algorithm in ES6
</div>

<br />

<div align="center">
  <!-- Build Status -->
  <img src="https://img.shields.io/travis/romainsimon/genetic-algorithm.svg?style=flat-square"
    alt="Build Status" />
  <!-- Test Coverage -->
  <img src="https://img.shields.io/coveralls/github/romainsimon/genetic-algorithm/master.svg?style=flat-square"
    alt="Test Coverage" />
  <!-- Standard -->
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"
      alt="Standard" />
  </a>
</div>

## Installation

`npm install genetalg`

## Usage

```js
const populationSize = 200
const chromosomeLength = 40
const genesPool = [0, 1]
const population = new Population(populationSize, chromosomeLength, genesPool)

const nbGenerations = 10000
const fitnessFunction = chromosome => (
  Math.random()
  // => Add fitness function here instead
  //    Should return a fitness score between 0 and 1
)
population.evolve(nbGenerations, fitnessFunction)

const bestChromosome = population.currentPopulation[0]
console.log(bestChromosome.dna)
console.log(bestChromosome.fitness)

```

## Example

Trivial example to evolve a population that will have `I AM A ROBOT AND I LIKE TO EAT BOLTS` written in their DNA

```js
const alphabet = [ ' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]
const target = 'I AM A ROBOT AND I LIKE TO EAT BOLTS'

// This fitness function will check which percentage
// of letters are valid in the generated sentence
const fitnessFunction = chromosome => {
  return chromosome.dna.split('')
    .reduce((acc, current, i) => acc + (current === target[i] ? 1 : 0), 0) / target.length
}

const population = new Population(30, target.length, alphabet)
population.evolve(1200, fitnessFunction)

// Should be `I AM A ROBOT AND I LIKE TO EAT BOLTS` (or pretty close)
console.log(population.currentPopulation[0].dna)

```
