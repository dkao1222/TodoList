const app = require('app.js')
const os = require('os');


const host = os.hostname();
const port = '3000';

app.use(function (req, res, next) {

    let url = 'http://' + host + ':12536'
    let ips = 'http://' + ip + ':12536'

    const allowedOrigins = [url, ips];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    //res.setHeader('Access-Control-Allow-Origin', url);
    //res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // Request methods you wish to allow
    //GET, POST, OPTIONS, PUT, PATCH, DELETE
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


const server = app.listen(port,host, () => {
    console.log(`Express is running on port ${server.address().port}`);
});