const express = require('express');
const cors = require('cors');

const cuentasRoutes = require('./routes/cuentas.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', cuentasRoutes);

module.exports = app;
