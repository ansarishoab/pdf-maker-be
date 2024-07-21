const express = require('express');
const healthcheck = require('./utils/healthcheck');
const logger = require("./utils/logger");
const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use('/healthcheck', healthcheck);
app.use('/api/v1', require('./routes/v1'));
//error handler
app.use((err, _, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something went wrong :/ \n. We are fixing it from our side.');
    next();
})
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
})

module.exports = app;