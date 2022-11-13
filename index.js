const app = require('./src/app');
const Loaders = require('./src/loaders')

const PORT = process.env.PORT || 3000

Loaders.start();
app.listen(PORT);