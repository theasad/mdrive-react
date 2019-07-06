const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

// With express
const express = require('express')
app
    .prepare()
    .then(() => {
        const server = express();
        server.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        server.use(handler).listen(3000, err => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });

    }).catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });

// Without express
// const { createServer } = require('http')
// app.prepare().then(() => {
//     createServer(handler).listen(3000, err => {
//         if (err) throw err;
//         console.log('> Ready on http://localhost:3000');
//     });
// }).catch(ex => {
//     console.error(ex.stack);
//     process.exit(1);
// });