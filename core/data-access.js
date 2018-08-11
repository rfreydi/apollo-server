const Reader = require('./reader');

class DataAccess {

  static attributes () {
    return Reader.file('data/attributes.json').then(attributes => JSON.parse(attributes));
  }

  static categories () {
    return Reader.file('data/categories.json').then(categories => JSON.parse(categories));
  }

  static entities () {
    return Reader.file('data/entities.json').then(entities => JSON.parse(entities));
  }

  static async properties () {
    return await Reader.file('data/properties.json').then(properties => JSON.parse(properties));
  }
}

module.exports = DataAccess;
