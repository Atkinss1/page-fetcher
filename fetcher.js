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

/**File address will be needed as the first parameter on the commandline, followed by your designated path.
 *                    *first argument - file address*
 * IE $ https://stackoverflow.com/questions/52732116/fs-writefile-with-an-object-returns-object-object ./test.txt
 *                                     * second argument ^^ file path*
 *
 */

const fileAddress = process.argv.slice(2)[0].trim();
const filePath = process.argv.slice(3)[0].trim();

// request function will take in CL arguments URL and request the body of the page
request(fileAddress, (error, response, body) => {

  //size of data in body
  
  let fileSize = body.length;

  if (!error) {

    // return information of a file
    
    fs.stat(filePath, (err, stats) => {
      
      // size of current file

      let currentFileSize = stats.size;
      if (err) {
        console.log('There was an error: ', err);
      } else {

        // if there is no errors we will check if the file exists in the path
        
        if (stats.isFile()) {
          rl.question('File name already exists. Do you want to overwrite? Press "Y" to overwrite or "N" if you want to append to the file.\n', (answer) => {
            if (answer.toLowerCase() === 'y') {

              // if the file exists already and the answer is equal to 'Y' then we will overwrite the file in the specified path

              fs.writeFile(filePath, body, (err) => {
                if (err) {
                  console.log('There was an error: ', err);
                } else {

                  // if no errors occur, it will display the file name created and size
                  
                  console.log(`File was written successfully\nFile name: ${filePath.slice(2)}\nFile size: ${fileSize} bytes`);
                }
              });
            }

            // if the answer is equal to 'N', we will add the current information to the file in the specified path

            if (answer.toLowerCase() === 'n') {
              fs.appendFile(filePath, body, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`The ${filePath.slice(2)} has succesfully been apended: file size is now: ${fileSize + currentFileSize} bytes`);
                }
              });
            }
          });
        }
      }
    });
  } else {
    console.log('There was an error: ', error);
  }
});
 