const express = require('express');
const xlsController = require('../controllers/xlsController');

const routes = express.Router();

routes.get('/xls', xlsController.index);

module.exports = routes;