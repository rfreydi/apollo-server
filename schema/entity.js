const Property = require('./property');

const Entity = `
  type Entity {
    guid: String!
    type: String!
    properties: [Property]!
  }
`;

module.exports = () => [Entity, Property];