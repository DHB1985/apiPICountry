const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', process.env.REQUEST_DOMAIN && process.env.REQUEST_LOCAL); // update to match the domain you will make the request from
  //Funcion para setear mas de un origen que desee hacer la petición al Heroku
  const allowedOrigins = [process.env.REQUEST_DOMAIN, process.env.REQUEST_LOCAL]
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
}
//Fin de la funcion para setear mas de un origen
  //res.header('Access-Control-Allow-Origin', [process.env.REQUEST_DOMAIN, process.env.REQUEST_LOCAL]); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
