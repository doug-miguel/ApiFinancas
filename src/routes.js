const { Router } = require('express');

const authController = require('./controllers/authController')
const fixendController = require('./controllers/tableFixendController')
const variableController = require('./controllers/tableVariableController')

const routes = Router();

// Rotas Auth
routes.post('/auth/register', authController.create);

routes.post('/login', authController.login);

routes.delete('/auth/delete/:id', authController.delete);

// Rotas TableVariable
routes.get('/tableVariable', variableController.consultTableVariable);

routes.post('/tableVariable/update', variableController.updateVariable);

routes.delete('/tableVariable/delete/:id', variableController.deleteTableVariable);

// Rotas TableFixend
routes.get('/tableFixend', fixendController.consultTableFixend);

routes.post('/tableFixend/update', fixendController.updateTableFixend);

routes.delete('/tableFixend/delete/:id', fixendController.deleteTableFixend);


 

module.exports = routes;