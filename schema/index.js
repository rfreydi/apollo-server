const {makeExecutableSchema} = require('apollo-server-express');
const Entity = require('./entity');
const resolverMocks = require('./mocks');

const RootQuery = `
  type RootQuery {
    entities: [Entity]
    entity(guid: String): Entity
  }
`;

const schemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [schemaDefinition, RootQuery, Entity],
  resolvers: resolverMocks
});

module.exports = schema;
