const {
    env,
    host,
    port,
} = require('./shared/config/vars');

const { app } = require('./shared/config/express');

app.listen(port, () => console.log(`Mobile API server is listening on ${host} (${env})`));
