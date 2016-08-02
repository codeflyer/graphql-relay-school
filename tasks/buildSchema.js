'use strict';
import fs from 'fs';
import path from 'path';

/**
 * Bundle and copy the css/scss files in the dist folder
 */
module.exports = () => {
  const tasks = {
    'build-schema': {
      fn: buildSchemaTask,
      description: 'Bundle and copy the css/scss files in the dist folder'
    }
  };
  return tasks;

  function buildSchemaTask(done) {
    const schema = require('../server/schemas/schema').schema;
    const graphql = require('graphql').graphql;
    const introspectionQuery = require('graphql/utilities').introspectionQuery;

    graphql(schema, introspectionQuery)
      .then(result => {
        if (result.errors) {
          console.error(
            'ERROR introspecting schema: ',
            JSON.stringify(result.errors, null, 2)
          );
          return done(result.errors);
        }
        fs.writeFileSync(
          path.join(__dirname, '../server/schemas/schema.json'),
          JSON.stringify(result, null, 2)
        );

        return done();
      });
  }
};
