const express = require('express');
const UserController = require('../controllers/UserController');
const loginRequired = require('../middlewares/loginRequired');
const Validate = require('../middlewares/validateSchema');
const UserSchema = require('../schemas/UserSchema');

const routes = express.Router();

routes.post('/users/', Validate(UserSchema.store), UserController.store);

routes.use(loginRequired);

routes.get('/users', UserController.index);
routes.get('/user/', Validate(UserSchema.show), UserController.show);
routes.put('/user/', Validate(UserSchema.update), UserController.update);
routes.delete('/user/', Validate(UserSchema.delete), UserController.delete);

module.exports = routes;