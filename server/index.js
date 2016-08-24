// index.js
// by requiring `babel/register`, all of our successive `require`s will be Babel'd
require('babel-polyfill');
require('babel-register');
require('./server.js');

