const request = require('request');
const fs = require('fs');
const fileAddress = process.argv.slice(2)[0].trim();

// request(fileAddress, (error, response, body) => {
//   console.log('error:', error);
//   console.log('Status code:', response);
//   console.log('body:', body);
// });