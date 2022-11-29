const http = require('http');
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')//'X-Requested-With')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.writeHead(200, {'Content-Type': 'text/plain'})


    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
        console.log('chunk：', chunk);
    })
    console.log('url:', req.url);
    req.on('end', () => {
        console.log('end 请求体', body);
        const d = {
            code: 0,
            data: {name: 'nick'}
        }
        res.write(JSON.stringify(d));
        res.end();
    })
}).listen(8081);