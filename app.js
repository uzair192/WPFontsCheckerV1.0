var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv/config");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const dbConnection = require('./config/dbConnection')
//const cookieSession = require("cookie-session");
//const NodeCache = require('node-cache');

// START DB CONNECTION POOL
dbConnection();

// IMPORT HELPER / UTILS 

// IMPORT MODELS 

// IMPORT ROUTES
const {
    spiderRoutes
} = require('./routes/index');

// MIDDELWARES
app.use(cors({ origin: "*" }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// HELMET SECURITY LAYER - HTTP SECURITY MECHANISM
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({ maxAge: 24 * 60 * 60 })); // FORCE HTTPS ONLY
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noSniff());

app.use(logger("dev"));
app.use(cookieParser());

// ROUTES
app.use('/api/v1', spiderRoutes);

// ERROR HANDLER MIDDLWARE
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        status: err.status || 500,
        error: process.env.NODE_ENV === "development" ? err.message : {},
        path: req.url,
        redirectTo: err.redirectTo ? err.redirectTo : "/",
    });
    next();
});

module.exports = app;
