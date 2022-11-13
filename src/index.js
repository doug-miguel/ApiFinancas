const app = require('./app');
const Loaders = require('./loaders')

const port = process.env.PORT || 3003

Loaders.start();
app.listen(port);