const DataAccess = require('../core/data-access');

const rootQueryMock = {
  categories: () => DataAccess.categories(),
  entities: () => DataAccess.entities(),
  entity: (parent, args) => DataAccess.entities().find(entity => entity.guid === args.guid),
  properties: () => DataAccess.properties()
};

const rootMutationMock = {
  addProperty: (parent, args) => DataAccess.addProperty({...args})
};

const entityMock = {
  category: (entity) => DataAccess.categories().then(categories => categories.find(category => category.guid === entity.category)),
  properties: (entity) =>
    DataAccess.properties().then((properties) =>
      properties.filter(property => entity.properties
        .map(prop => prop.code)
        .includes(property.code)
      ).map(property => {
        const entProp = entity.properties.find(e => e.code === property.code);
        return {
          ...entProp,
          ...property
        };
      })
    )
};

const propertyMock = {
  value: (property) => {
    if (property.type !== 'entity' || !property.value) {
      return property.value;
    }

    return DataAccess.entities().then(entities =>
      entities.filter(entity => property.value
        .includes(entity.guid)
      )
    );
  }
};

const resolverMocks = {
  RootQuery: {...rootQueryMock},
  RootMutation: {...rootMutationMock},
  Entity: {...entityMock},
  Property: {...propertyMock}
};

module.exports = resolverMocks;