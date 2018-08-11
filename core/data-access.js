const Reader = require('./reader');
const Writer = require('./writer');

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

  static properties () {
    return Reader.file('data/properties.json').then(properties => JSON.parse(properties));
  }

  static addProperty ({code, type, label}) {
    const temp = [
      {
        'code': 'label',
        'type': 'string',
        'label': 'Label',
        'attributes': {
          'readonly': true,
          'required': true
        }
      },
      {
        'code': 'stations',
        'type': 'entity',
        'label': 'Stations',
        'attributes': {
          'readonly': false,
          'required': false
        },
        'target': 'station'
      }
    ];
    const property = {
      code,
      type,
      label,
      attributes: {
        readonly: false,
        required: false
      }
    };
    return this.properties().then(properties => {
      properties.push(property);
      return Writer.file('data/properties.json', JSON.stringify(properties)).then(prop => {
        console.log(prop);
        return property;
      });
    });
  }
}

module.exports = DataAccess;
