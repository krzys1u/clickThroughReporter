const express = require("express");

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

class ExpressApplication {
    constructor(config) {
        this.app = express();
        this.config = config;

        this.setUp()
    }

    getApp() {
        return this.app;
    }

    getConfig() {
        return this.config;
    }

    setUp() {
        this.app.engine('html', require('mustache-express')());

        this.app.set('port', this.config.port);
        this.app.set('view engine', 'html');
        this.app.set('config', this.config);
        this.app.set('views', __dirname + '/views')

        this.applyMiddlewares();

        this.registerCommonHandlers();
    }

    applyMiddlewares() {
        this.middlewares.forEach((middleware) => this.app.use(middleware));
    }

    registerCommonHandlers() {
        this.app.get('/hello', (req, res) => {
            res.send('hello world');
        });
    }
}

ExpressApplication.prototype.middlewares = [
    bodyParser.json(),
    cookieSession({
        name: 'session',
        keys: ['as890foij23r9lkmzoip3ponoi211ad'],
        maxAge: 72 * 60 * 60 * 1000 // 72 hours
    }),
    (err, req, res, next) => {
        console.error('Application error: ', err);
        res.status(err.status || 500).render('error', {
            message: err.message,
            error: err
        });
    }
];

module.exports = ExpressApplication;