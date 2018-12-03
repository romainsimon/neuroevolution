'use strict'

const { expect } = require('chai')
const { Genome } = require('./genome.class')
const { Node } = require('./node.class')
const { Connection } = require('./connection.class')
const { Innovation } = require('./innovation.class')

describe('Genome', () => {

  describe('creation', () => {
    it('should create a new Genome with all properties', () => {
      const genome = new Genome(2, 3)
      expect(genome).to.be.an('object')
      expect(genome).to.have.all.keys('nodes', 'innovation', 'connections', 'nbInput', 'nbOutput', 'fitness')
      expect(genome.nodes).to.have.lengthOf(2+3)
    })
    it('should create a new Genome with increasing innovation numbers in initial nodes', () => {
      const genome = new Genome(2, 3)
      expect(genome).to.be.an('object')
      expect(genome.nodes[1].innovationNumber).to.be.above(genome.nodes[0].innovationNumber)
    })
    it('should preserve innovation numbers when copying a genome', () => {
      const genome1 = new Genome(2, 2)
      genome1.addConnection()
      const genome2 = genome1
      expect(genome2.nodes[0].innovationNumber).to.equal(genome1.nodes[0].innovationNumber)
      expect(genome2.nodes[1].innovationNumber).to.equal(genome1.nodes[1].innovationNumber)
      expect(genome2.connections[0].innovationNumber).to.equal(genome1.connections[0].innovationNumber)
    })
  })

  describe('dna', () => {
    it('should return a valid dna string representing genome', () => {
      const genome = new Genome(2, 3, null, [
        new Connection(1, 1, 4),
        new Connection(2, 2, 3),
        new Connection(3, 2, 4)
      ])
      expect(genome.dna()).to.be.a('string')
      expect(genome.dna()).to.equal('1[1>4],2[2>3],3[2>4]')
    })
  })

  describe('getNode', () => {
    it('should get a node by its innovation number', () => {
      const genome = new Genome(1, 2, [
        new Node(1, 'input'),
        new Node(2, 'output')
      ])
      const node1 = genome.getNode(1)
      expect(node1).to.be.an('object')
      expect(node1.innovationNumber).to.equal(1)
      expect(node1.type).to.equal('input')
      const node2 = genome.getNode(2)
      expect(node2).to.be.an('object')
      expect(node2.innovationNumber).to.equal(2)
      expect(node2.type).to.equal('output')
      const node32 = genome.getNode(42)
      expect(node32).to.equal(null)
    })
  })

  describe('getConnection', () => {
    it('should get a connection by its innovation number', () => {
      const genome = new Genome(2, 3, null, [
        new Connection(1, 4, 1),
        new Connection(2, 3, 2)
      ])
      const conn1 = genome.getConnection(1)
      expect(conn1).to.be.an('object')
      expect(conn1.innovationNumber).to.equal(1)
      const conn2 = genome.getConnection(2)
      expect(conn2).to.be.an('object')
      expect(conn2.innovationNumber).to.equal(2)
      const conn32 = genome.getConnection(42)
      expect(conn32).to.equal(null)
    })
  })

  describe('possibleNewConnections', () => {
    it('should create all combinations of possible connections without existing and input-input or output-output', () => {
      const genome = new Genome(1, 3, [
        new Node(1, 'input'),
        new Node(2, 'hidden'),
        new Node(3, 'hidden'),
        new Node(4, 'output')
      ], [
        new Connection(1, 1, 2),
        new Connection(2, 1, 3),
        new Connection(3, 1, 4),
        new Connection(4, 2, 4)
      ])
      const newConn = genome.possibleNewConnections()
      expect(newConn).to.be.an('array')
      expect(newConn).to.have.lengthOf(2)
      expect(newConn[0]).to.be.an('array')
      expect(newConn[0][0]).to.equal(2)
      expect(newConn[0][1]).to.equal(3)
      expect(newConn[1]).to.be.an('array')
      expect(newConn[1][0]).to.equal(3)
      expect(newConn[1][1]).to.equal(4)
    })
  })

  describe('distance', () => {
    it('should calculate distance between two genomes', () => {
      const genomeA = new Genome(1, 3, [
        new Node(1, 'input'),
        new Node(2, 'hidden'),
        new Node(3, 'hidden'),
        new Node(4, 'output')
      ], [
        new Connection(1, 1, 2),
        new Connection(2, 1, 3),
        new Connection(3, 1, 4),
        new Connection(4, 2, 4)
      ])
      const genomeB = genomeA
      const distance = genomeA.distance(genomeB)
      const distance2 = genomeB.distance(genomeA)
      expect(distance).to.be.a('number')
      expect(distance).to.equal(distance2)
    })
    it('should inscrease distance when mutation occurs', () => {
      const genomeA = new Genome(1, 3, [
        new Node(1, 'input'),
        new Node(2, 'hidden'),
        new Node(3, 'hidden'),
        new Node(4, 'output')
      ], [
        new Connection(1, 1, 2),
        new Connection(2, 1, 3),
        new Connection(3, 1, 4),
        new Connection(4, 2, 4)
      ])
      const genomeB = genomeA
      const distance1 = genomeA.distance(genomeB)
      genomeB.mutate()
      genomeB.mutate()
      genomeB.mutate()
      genomeB.mutate()
      const distance2 = genomeA.distance(genomeB)
      expect(distance2).to.be.above(distance1)
    })
  })

  describe('mutate', () => {
    it('should either add node or connection', () => {
      const genome = new Genome(1, 2)
      genome.addConnection()
      genome.mutate()
      expect(genome.connections.length + genome.nodes.length).to.be.above(3)
    })
  })

  describe('addConnection', () => {
    it('should create new connection with increasing innovation numbers', () => {
      const genome = new Genome(1, 3, [
        new Node(1, 'input'),
        new Node(3, 'hidden'),
        new Node(4, 'hidden'),
        new Node(2, 'output')
      ], null)
      genome.addConnection()
      genome.addConnection()
      expect(genome.connections).to.be.an('array')
      expect(genome.connections).to.have.lengthOf(2)
      expect(genome.connections[1].innovationNumber).to.be.above(genome.connections[0].innovationNumber)
    })
  })

  describe('crossover', () => {
    it('should create a child genome with all properties', () => {
      const genome1 = new Genome()
      const genome2 = new Genome()
      const children = genome1.crossover(genome2)
      expect(children).to.be.an('object')
      expect(children).to.have.all.keys('nodes', 'innovation', 'connections', 'nbInput', 'nbOutput', 'fitness')
    })

    it('should create a child with genes from fitest parent', () => {
      const innovation = new Innovation()
      innovation.reset()
      const genome1 = new Genome(1, 2)
      const genome2 = genome1
      genome2.addConnection()
      genome2.addConnection()
      const smallFitness = () => .4
      genome1.calculateFitness(smallFitness)
      const betterFitness = () => .8
      genome2.calculateFitness(betterFitness)
      const children = genome1.crossover(genome2)
      expect(children.nodes).to.have.lengthOf(3)
      expect(children.connections).to.have.lengthOf(2)
    })
  })

  describe('generateNetwork', () => {
    it('should generate network', () => {
      const genome = new Genome(1, 2)
      const network = genome.generateNetwork()
      expect(network).to.be.an('object')
      // @TODO
    })
  })

})
