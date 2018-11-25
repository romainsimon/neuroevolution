'use strict';

const { expect } = require('chai')
const { Genome } = require('./genome.class')
const { Node } = require('./node.class')
const { Connection } = require('./connection.class')
let { lastConnectionNumber } = require('./connection.class')

describe('Genome', () => {

  describe('creation', () => {
    it('should create a new Genome with all properties', () => {
      const genome = new Genome(2, 3)
      expect(genome).to.be.an('object')
      expect(genome).to.have.all.keys('nodes', 'connections', 'nbInput', 'nbOutput', 'fitness')
      expect(genome.nodes).to.have.lengthOf(2+3)
    })
  })

  describe('dna', () => {
    it('should return a valid dna string', () => {
      const genome = new Genome(2, 3, null, [
        new Connection(1, 4, 1),
        new Connection(2, 3, 2),
        new Connection(2, 4, 3)
      ])
      expect(genome.dna()).to.be.an('string')
      expect(genome.dna()).to.equal('1[1>4],2[2>3],3[2>4]')
    })
  })

  describe('getNode', () => {
    it('should get a node by its innovation number', () => {
      const genome = new Genome(1, 2, [
        new Node('input', 1),
        new Node('output', 2)
      ])
      const node1 = genome.getNode(1)
      expect(node1).to.be.an('object')
      expect(node1.innovationNumber).to.equal(1)
      const node2 = genome.getNode(2)
      expect(node2).to.be.an('object')
      expect(node2.innovationNumber).to.equal(2)
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

  describe('possibleNewConnnections', () => {
    it('should create all combinations of possible connections without existing and input-input or output-output', () => {
      const genome = new Genome(1, 3, [
        new Node('input', 1),
        new Node('hidden', 2),
        new Node('hidden', 3),
        new Node('output', 4)
      ], [
        new Connection(1, 2, 1),
        new Connection(1, 3, 2),
        new Connection(1, 4, 3),
        new Connection(2, 4, 4)
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

  describe('addConnection', () => {
    it('should create new connection with innovation numbers', () => {
      const genome = new Genome(1, 3, [
        new Node('input', 1),
        new Node('hidden', 2),
        new Node('hidden', 3),
        new Node('output', 4)
      ], [
        new Connection(1, 2),
        new Connection(1, 3),
        new Connection(1, 4)
      ])
      genome.addConnection()
      expect(genome.connections).to.be.an('array')
      expect(genome.connections).to.have.lengthOf(4)
      expect(genome.connections[3].innovationNumber).to.be.above(genome.connections[2].innovationNumber)
    })
  })

  describe('crossover', () => {
    it('should create a child genome with all properties', () => {
      const genome1 = new Genome()
      const genome2 = new Genome()
      const children = genome1.crossover(genome2)
      expect(children).to.be.an('object')
      expect(children).to.have.all.keys('nodes', 'connections', 'nbInput', 'nbOutput', 'fitness')
    })

    it('should create a child with genes from fitest parent', () => {
      const genome1 = new Genome([
        new Node('input', 1),
        new Node('hidden', 2),
        new Node('output', 3)
      ], [
        new Connection(1, 2, 1),
        new Connection(2, 3, 2)
      ])
      const genome2 = new Genome([
        new Node('input', 1),
        new Node('hidden', 2),
        new Node('output', 3),
        new Node('hidden', 4)
      ], [
        new Connection(1, 2, 1),
        new Connection(2, 3, 2),
        new Connection(1, 4, 3),
        new Connection(2, 4, 4)
      ])
      const smallFitness = () => .4
      genome1.calculateFitness(smallFitness)
      const betterFitness = () => .8
      genome2.calculateFitness(betterFitness)
      const children = genome1.crossover(genome2)
      expect(children.connections).to.have.lengthOf(4)
      expect(children.connections).to.have.lengthOf(4)
    })

  })

})
