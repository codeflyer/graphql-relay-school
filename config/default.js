const path = require('path');
const useSocket = true;
module.exports = {
  folders: {
    build: path.join(__dirname, '../dist')
  },
  server: {
    port: 8080,
    useSocket
  },
  webpack: {
    logDispatcher: true
  },
  clientConfig: {
    useSocket
  }
};
