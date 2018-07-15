const Attribute = require('./attribute');

const Property = `
  scalar Value
  
  type Property {
    code: String!
    type: String!
    value: Value
    attributes: Attribute
  }
`;

module.exports = () => [Property, Attribute];