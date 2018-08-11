const {makeExecutableSchema} = require('apollo-server-express');
const Entity = require('./entity');
const resolverMocks = require('./mocks');

const RootQuery = `
  type RootQuery {
    categories: [Category]
    entities: [Entity]
    entity(guid: String): Entity
    properties: [Property]
  }
`;

const RootMutation = `
  type RootMutation {
    addProperty(code: String!, type: String!, label: String!): Property
  }
`;

const schemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [schemaDefinition, RootQuery, RootMutation, Entity],
  resolvers: resolverMocks
});

module.exports = schema;
