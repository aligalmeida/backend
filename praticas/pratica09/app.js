const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');


const apidocsRouter = require('./routes/apidocsRouter');

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});


app.use('/api-docs', apidocsRouter);


app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});


app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;

