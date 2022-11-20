const { Router } = require('express');

const authController = require('./controllers/authController')
const fixendController = require('./controllers/tableFixendController')
const variableController = require('./controllers/tableVariableController')

const routes = Router();

// Rotas Auth
routes.post('/auth/register', authController.create);

routes.post('/auth/update', authController.update);

routes.post('/login', authController.login);

routes.delete('/auth/delete/:id', authController.delete);

// Rotas TableVariable
routes.get('/tableVariable/:id', variableController.consultTableVariable);

routes.post('/tableVariable/create', variableController.createTableVariable);

routes.post('/tableVariable/update', variableController.updateTableVariable);

routes.delete('/tableVariable/delete/:id', variableController.deleteTableVariable);

// Rotas TableFixend
routes.get('/tableFixend/:id', fixendController.consultTableFixend);

routes.post('/tableFixend/create', fixendController.createTableFixend);

routes.post('/tableFixend/update', fixendController.updateTableFixend);

routes.delete('/tableFixend/delete/:id', fixendController.deleteTableFixend);


 

module.exports = routes;