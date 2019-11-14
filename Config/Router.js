const app = require('./app');

const authRouter = require('../Routes/Auth');

const adminRouter = require('../Routes/Admin')

const apiPrefix = '/api/v1';

app.use(`${apiPrefix}/auth`,authRouter);

app.use(`${apiPrefix}/admin`,adminRouter);