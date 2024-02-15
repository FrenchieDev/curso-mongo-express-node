const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate')

//////////////////////////////////////////
// ----- FILES -----
// //Blocking, synchronous way
// const text = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(text)
// const textOut = `This is what we know: ${text}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./starter/txt/output.txt', textOut)
// console.log("File created!")

// //Non-blocking, asynchronous way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.error("ERROR!")
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2)
//         fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3)

//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {

//             } )
//         })
//     })
// })
// console.log("Will read file!")

//////////////////////////////////////////
// ----- SERVER -----
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8')        
const dataObject = JSON.parse(data)


const server = http.createServer((req, res) => {
    const { query, pathname } = (url.parse(req.url, true));
    
    
    // OVERVIEW PAGE
    if(pathname === '/' || pathname === '/overview' ) {
        res.writeHead(200, { 'Content-type': 'text/html'})
        const cardsHTML = dataObject.map( elem => replaceTemplate(tempCard, elem)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHTML) 
        res.end(output)

    // PRODUCT PAGE
    } else if (pathname === '/product' )  {
        res.writeHead(200, { 'Content-type': 'text/html'})    
        const product = dataObject[query.id];
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

    // API PAGE
    } else if (pathname === '/api') {
            res.writeHead(200, { 'Content-type': 'application/json'})
            res.end(data)        
    
    // NOR FOUND
        } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello world'
        });
        res.end('<h1>Page not found</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is on! Listening on port 8000')
});

