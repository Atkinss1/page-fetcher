const request = require('request');
const fs = require('fs');

// command line arguments that takes the index from an array to use in our request function
const fileAddress = process.argv.slice(2)[0].trim();



request(fileAddress, (error, response, body) => {
  if (!error) {
    fs.writeFile('./test.txt', body, (err) => {
      if (err) {
        console.log('There was an error: ', err);
      } else {
        console.log('File written successfully.');
      }
    });
  } else {
    console.log('There was an error: ', error);
  }
});