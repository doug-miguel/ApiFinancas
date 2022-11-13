const app = require('./src/app');
const Loaders = require('./src/loaders')

const port = process.env.PORT || 3003

Loaders.start();
app.listen(port);