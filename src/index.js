const app = require('./app');
const Loaders = require('./loaders')

Loaders.start();
app.listen(3000);