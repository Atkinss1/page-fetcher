const request = require('request');
const fs = require('fs');
const readline = require('readline');
const stdin = process.stdin;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
stdin.setRawMode(true);
stdin.setEncoding('utf-8');


// command line arguments that takes the index from an array to use in our request function
const fileAddress = process.argv.slice(2)[0].trim();


// request function will take in CL arguments URL and request the body of the page
request(fileAddress, (error, response, body) => {
  let fileSize = body.length;
  let fileName = './test.txt';
  
  if (!error) {
    // writeFile will use the body parameter from request and create a file to write the body(data)
    fs.writeFile(fileName, body, (err) => {
      if (err) {
        console.log('There was an error: ', err);
      }
      // if no errors occur, it will display the file name created and size
      console.log(`File was written successfully\nFile name: ${fileName.slice(2)}\nFile size: ${fileSize} bytes`);
    });
  }
  
});