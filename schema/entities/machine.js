const Station = require('./station');

const Machine = `
  type Machine {
    guid: String!
    type: String!
    code: String! @deprecated
    stations: [Station]
  }
`;

module.exports = () => [Machine, Station];