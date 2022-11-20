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
routes.get('/tablevariable/:id', variableController.consultTableVariable);

routes.post('/tablevariable/create', variableController.createTableVariable);

routes.post('/tablevariable/update', variableController.updateTableVariable);

routes.delete('/tablevariable/delete/:id', variableController.deleteTableVariable);

// Rotas TableFixend
routes.get('/tablefixend/:id', fixendController.consultTableFixend);

routes.post('/tablefixend/create', fixendController.createTableFixend);

routes.post('/tablefixend/update', fixendController.updateTableFixend);

routes.delete('/tablefixend/delete/:id', fixendController.deleteTableFixend);


 

module.exports = routes;