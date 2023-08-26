const app = require('./src/app/app');
const dbConnection = require('./src/config/db.config');
const { ENV_CONFIG } = require('./src/config/env.config');

const port = ENV_CONFIG.port || 3000;

app.listen(port, () => {
    dbConnection()
    console.log(`App running on port ${port}!`);
})