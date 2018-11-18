'use strict';

const { expect } = require('chai')
const Genome = require('./genome.class')
const Node = require('./node.class')
const Connection = require('./connection.class')

describe('Genome', () => {

  describe('creation', () => {
    it('should create a new Genome with all properties', () => {
      const genome = new Genome()
      expect(genome).to.be.an('object')
      expect(genome).to.have.all.keys('nodes', 'connections', 'fitness')
    })
    it('should have connections with increasing innovation numbers', () => {
      const genome = new Genome()
      expect(genome.connections).to.be.an('array')
      expect(genome.connections[0].innovationNumber).to.equal(1)
    })
  })

  describe('dna', () => {
    it('should return a valid dna string', () => {
      const genome = new Genome()
      expect(genome.dna()).to.be.an('string')
      expect(genome.dna()).to.equal('1[1>2],2[2>3]')
    })
  })

  describe('getNode', () => {
    it('should get a node by its innovation number', () => {
      const genome = new Genome()
      const node1 = genome.getNode(1)
      expect(node1).to.be.an('object')
      expect(node1.innovationNumber).to.equal(1)
      const node2 = genome.getNode(2)
      expect(node2).to.be.an('object')
      expect(node2.innovationNumber).to.equal(2)
      const node32 = genome.getNode(32)
      expect(node32).to.equal(null)
    })
  })

  describe('getConnection', () => {
    it('should get a connection by its innovation number', () => {
      const genome = new Genome()
      const conn1 = genome.getConnection(1)
      expect(conn1).to.be.an('object')
      expect(conn1.innovationNumber).to.equal(1)
      const conn2 = genome.getConnection(2)
      expect(conn2).to.be.an('object')
      expect(conn2.innovationNumber).to.equal(2)
      const conn32 = genome.getConnection(32)
      expect(conn32).to.equal(null)
    })
  })

  describe('possibleNewConnnections', () => {
    it('should create all combinations of possible connection', () => {
      const genome = new Genome()
      const newConn = genome.possibleNewConnections()
      expect(newConn).to.be.an('array')
      expect(newConn[0]).to.be.an('array')
      expect(newConn[0][0]).to.equal(1)
      expect(newConn[0][1]).to.equal(3)
    })
  })

  describe('crossover', () => {
    it('should create a child genome with all properties', () => {
      const genome1 = new Genome()
      const genome2 = new Genome()
      const children = genome1.crossover(genome2)
      expect(children).to.be.an('object')
      expect(children).to.have.all.keys('nodes', 'connections', 'fitness')
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
