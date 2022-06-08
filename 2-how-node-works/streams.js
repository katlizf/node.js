const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
    // SOLUTION 1
    fs.readFile('./2-how-node-works/starter/test-file.txt', (err, data) => {
        if (err) console.log(err)
        res.end(data)
    })

    // SOLUTION 2: with streams
    const readable = fs.createReadStream('./2-how-node-works/starter/test-file.txt')
    readable.on('data', chunk => {
        res.write(chunk)
    })
    readable.on('end', () => {
        res.end()
    })
    readable.on('error', err => {
        console.log(err)
        res.statusCode = 500
        res.end('File not found')
    })
    // stream the content of the file without saving it to a variable, faster; reading a piece of the file and sending it once it's available and repeats this until it has read all the data

    // SOLUTION 3: use pipe alleviates backpressure
    const readable2 = fs.createReadStream('./2-how-node-works/starter/test-file.txt')
    readable2.pipe(res)
        // readableSource.pipe(writableDestination)
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening...')
})