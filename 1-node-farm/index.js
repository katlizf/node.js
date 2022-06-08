const fs = require('fs')
const http = require('http')
// set-up to create web server capable of accepting requests and sending back responses; http gives networking capabilities
const url = require('url')
// able to analyze for routing


// FILES



// SERVER
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    // /.../g replaces all global instances of ...
    output = output.replace (/{%IMAGE%}/g, product.image)
    output = output.replace (/{%PRICE%}/g, product.price)
    output = output.replace (/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace (/{%QUANTITY%}/g, product.quantity)
    output = output.replace (/{%DESCRIPTION%}/g, product.description)
    output = output.replace (/{%ID%}/g, product.id)

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

    return output
}

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data) /*JSON.parse will take the JSON string and turn it into JS*/
// top-level code that is only executed once place at the beginning, is blocking code


const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true)

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead (200, {'Content-type': 'text/html'})

        const cardsHtml = dataObj.map(elem => replaceTemplate(tempCard, elem)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

        res.end(output)

    // Product page
    } else if (pathname === '/product') {
        res.writeHead (200, {'Content-type': 'text/html'})
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

    // API
    } else if (pathname === '/api') {
            res.writeHead (200, {'Content-type': 'application/json'})
            res.end(data)

    // Not found
        } else {
            res.writeHead(404, {
                'Contect-type': 'text/html',
                'My-own-header': 'hello-world' /*header written as object, can use to send some metadata about the response, can write your own header*/
            }) /*writes status code in dev tools console*/
        res.end('Page not found')
    }
    // setting up routing

    // res.end('Hello from the server') /*way to send response back from the server*/
})
// this function will run everytime a request is made

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})
// first param is port number, second is local host(typically 127.0.0.1 as default)
// server.listen starts up server to start listening for requests