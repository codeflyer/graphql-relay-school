'use strict';

/**
 * Build the complete application in the dist folder
 */
module.exports = () => {
  const tasks = {
    build: {
      seq: [
        'clean',
        'css',
        'build-schema',
        'build-src',
        'copy-html'
      ]
    }
  };
  return tasks;
};
