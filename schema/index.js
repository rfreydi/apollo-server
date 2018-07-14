const {makeExecutableSchema, MockList} = require('apollo-server-express');
const Machine = require('./entities/machine');

const RootQuery = `
  type Test {
    value: String
  }
  type RootQuery {
    machine(guid: String!): Machine
    machines: [Machine]
    test: Test
  }
`;

const schemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const mockMachines = [
  {
    guid: 'machine1',
    type: 'machine',
    stations: ['station1', 'station2']
  }, {
    guid: 'machine2',
    type: 'machine',
    stations: ['station1']
  }
];
const mockStations = [
  {
    guid: 'station1',
    type: 'station'
  }, {
    guid: 'station2',
    type: 'station'
  }
];

const mockTest = {
  value: 'test value'
};

const mockResolvers = {
  RootQuery: {
    test: () => mockTest,
    machine: (parent, args) => mockMachines.find(machine => machine.guid === args.guid),
    machines: () => mockMachines,
  },
  Machine: {
    code: (machine) => machine.type,
    stations: (machine) => mockStations.filter(station => machine.stations.includes(station.guid))
  }
};

const schema = makeExecutableSchema({
  typeDefs: [schemaDefinition, RootQuery, Machine],
  resolvers: mockResolvers
});

module.exports = schema;
