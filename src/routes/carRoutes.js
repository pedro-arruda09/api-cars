const express = require('express');
const CarController = require('../controllers/CarController');
const loginRequired = require('../middlewares/loginRequired');
const Validate = require('../middlewares/validateSchema');
const CarSchema = require('../schemas/CarSchema');

const routes = express.Router();

routes.use(loginRequired)

routes.get('/cars', CarController.index);
routes.get('/cars/:id', Validate(CarSchema.show), CarController.show);
routes.post('/cars/', Validate(CarSchema.store), CarController.store);
routes.put('/cars/:id', Validate(CarSchema.update), CarController.update);
routes.delete('/cars/:id', Validate(CarSchema.delete), CarController.delete);

module.exports = routes;