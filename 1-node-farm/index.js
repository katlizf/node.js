const fs = require('fs')
// fs is file system; access to reading and writing data right to the file system; return an object with lots of functions to use stored in fs variable

// const hello = 'Hello World'
// console.log(hello)
// in terminal, "node Index.js" will run the Index.js file in the terminal

const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8')
console.log(textIn)
// Example of how to read a file
// sync for synchronous
// first param if the file path, second is defining the character encoding
// calling this function will read the data in the file and return it

const textOut = `This is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`
// what we want to write to the file
fs.writeFileSync('./starter/txt/output.txt', textOut)
console.log('File written')
// Example of how to write to a file
// first param is the file path, second is what we want to write