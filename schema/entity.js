const Category = require('./category');
const Property = require('./property');

const Entity = `
  type Entity {
    guid: String!
    category: Category!
    properties: [Property]!
  }
`;

module.exports = () => [Entity, Category, Property];