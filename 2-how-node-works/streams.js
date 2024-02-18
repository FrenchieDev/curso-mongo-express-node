const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // SOLUTION 1 -- Not good for production and large data
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    // SOLUTION 2: STREAMS
    // const readable = fs.createReadStream('tet-file.txt');
    // readable.on('data', (chunk) => {
    //     res.write(chunk);
    // });

    // readable.on('end', () => {
    //     res.end();
    // });

    // readable.on('error', (err) => {
    //     console.error(err);
    //     res.statusCode = 500;
    //     res.end('File not found');
    // });

    // SOLUTION 3 THE GOOD ONE
    const readable = fs.createReadStream('tet-file.txt');
    readable.pipe(res);
    // readableSource.pipe(writeableDest)
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server on');
});
