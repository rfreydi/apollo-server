const categoryMocks = [
  {
    guid: 'machine',
    value: 'Machine'
  }, {
    guid: 'station',
    value: 'Station'
  }
];
const entityMocks = [
  {
    guid: 'machine1',
    category: 'machine',
    properties: [
      {
        code: 'label',
        value: 'Machine 1'
      }, {
        code: 'stations',
        value: ['station1', 'station2']
      }
    ]
  }, {
    guid: 'station1',
    category: 'station',
    properties: [
      {
        code: 'label',
        value: 'Station 1'
      }
    ]
  }
];

const propertyMocks = [
  {
    code: 'label',
    type: 'string',
    attributes: {
      readonly: true,
      required: false
    }
  }, {
    code: 'stations',
    type: 'entity',
    attributes: {
      readonly: false,
      required: false,
      target: 'station'
    }
  }
];

const resolverMocks = {
  RootQuery: {
    categories: () => categoryMocks,
    entities: () => entityMocks,
    entity: (parent, args) => entityMocks.find(entity => entity.guid === args.guid)
  },
  Entity: {
    category: (entity) => categoryMocks.find(category => category.guid === entity.category),
    properties: (entity) => {
      return propertyMocks
        .filter(property => entity.properties
          .map(prop => prop.code)
          .includes(property.code)
        )
        .map(property => {
          const entProp = entity.properties.find(e => e.code === property.code);
          return {
            ...entProp,
            ...property
          };
        });
    }
  },
  Property: {
    value: (property) => {
      if (property.type !== 'entity') {
        return property.value;
      }

      return entityMocks
        .filter(entity => property.value
          .includes(entity.guid)
        );
    }
  }
};

module.exports = resolverMocks;