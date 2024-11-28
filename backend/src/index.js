import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import indexRoute from './routers/index.js';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json()) 
app.use(cors())
app.use(function (req, res, next) {
    console.log("allow cors");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Token");
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', "POST, GET");
        return res.status(200).json({});
    }
    else{
        console.log("request method:",req.method);
        // log request path and method
        console.log(`${req.method} ${req.path}`);
    }
    next();
});

// app.get('/', (req, res) => {
//   res.send('server running ... ');
// });


// app.post('/', (req, res) => {
//   res.send('server running ... ');
// });

app.use('/', indexRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

process.on('uncaughtException', function (err) {
    if (err.code === 'EADDRINUSE') {
        console.log('Process is already running.', err);
        process.exit(0);
    } else {
        console.error(err);
    }
});