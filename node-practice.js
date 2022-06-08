const fs = require('fs')
// fs is file system; access to reading and writing data right to the file system; return an object with lots of functions to use stored in fs variable

// const hello = 'Hello World'
// console.log(hello)
// in terminal, "node Index.js" will run the Index.js file in the terminal


// BLOCKING SYNCRONOUS WAY
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


// NON-BLOCKING ASYNCHRONOUS WAY
fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('Error!')
    fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
        if (err) return console.log('Error!')
        console.log(data2)
        fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => {
            if (err) return console.log('Error!')
            console.log(data3)
            fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                if (err) return console.log('Error!')
                console.log('File has been written')
            })
        })
    })    
})