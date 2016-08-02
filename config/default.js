const path = require('path');
module.exports = {
  folders: {
    build: path.join(__dirname, '../dist')
  },
  server: {
    port: 8080
  },
  webpack: {
    logDispatcher: true
  },
  clientConfig: {}
};
