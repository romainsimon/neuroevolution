<h1 align="center">NeuroEvolution of Augmenting Topologies (NEAT)</h1>

<div align="center">
  :hatching_chick: Evolving a population of Neural Networks using Tensorflow.js and Genetic Algorithm in ES6. This is an implementation of <a href="http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf">NEAT</a> (Neuro Evolution of Augmenting topologies)
</div>

<br />

<div align="center">
  <!-- Build Status -->
  <img src="https://img.shields.io/travis/romainsimon/neuroevolution.svg?style=flat-square"
    alt="Build Status" />
  <!-- Test Coverage -->
  <img src="https://img.shields.io/coveralls/github/romainsimon/neuroevolution/master.svg?style=flat-square"
    alt="Test Coverage" />
  <!-- Standard -->
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"
      alt="Standard" />
  </a>
</div>


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [1. Initialize a new population](#1-initialize-a-new-population)
  - [2. Evolve the population](#2-evolve-the-population)
- [Examples](#examples)
  - [Xor](#xor)
- [License](#license)

## Installation

Install using [`npm`](https://www.npmjs.com/package/neuroevolution):

```bash
npm install neuroevolution
```

or Yarn [`yarn`](https://yarnpkg.com/en/package/neuroevolution):

```bash
yarn add neuroevolution
```

## Usage

### 1. Initialize a new population

The first step should be to initialize a new population.

A population accepts 3 main parameters:
- `populationSize` Total size of the genomes population
- `nbInput` Number of input nodes
- `nbOutput` Number of output node

```javascript
const { Population } = require('neuroevolution')
const population = new Population(100, 2, 4)
```

This will create a population of 100 neural networks with 2 inputs and 4 outputs.

### 2. Evolve the population

You can start evolving the population using `evolve` with 2 parameters :
- `iterations` How many iterations to evolve
- `fitnessFunction` You fitness function that has access to your genome

```javascript
population.evolve(40, genome => {
  const network = genome.generateNetwork()
  const prediction = network.predict(input)
  // ... return a fitness score according to the accuracy of prediction
})
```

This will evolve the population, keeping the fittest neural networks according to your
fitness function accross 40 generations. The number of iterations is cumulative, this means
if your population current generation is 12, evolving with 40 iterations will transform the
population to generation 52.


## Examples

### Xor

To run this example :

```bash
node examples/xor
```

Sample code :

```javascript
const { Population } = require('neuroevolution')
const population = new Population(50, 2, 1, false)
const xor = [
  [[0, 0], 0],
  [[0, 1], 1],
  [[1, 0], 1],
  [[1, 1], 0],
]

population.evolve(1000, genome => {
  const network = genome.generateNetwork()
  let error = 0;
  for (const [input, output] of xor) {
    const [prediction] = network.predict(input)
    error += Math.abs(prediction - output)
  }
  return 1 - (error / 4)
})
```

## License

Neuroevolution is [MIT licensed](./LICENSE).