const entityMocks = [
  {
    guid: 'machine1',
    type: 'machine',
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
    type: 'station',
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
    entity: (parent, args) => entityMocks.find(entity => entity.guid === args.guid),
    entities: () => entityMocks,
  },
  Entity: {
    properties: (entity) => {
      const pm = propertyMocks
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
      console.log(entity.properties);
      return pm;
    }
  },
  Property: {
    value: (property) => {
      // console.log(property);
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