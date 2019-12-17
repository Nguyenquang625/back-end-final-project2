const app = require('./app');

const authRouter = require('../Routes/Auth');

const adminRouter = require('../Routes/Admin');

const noAuthRouter = require('../Routes/NoAuth');

const ownerRouter = require('../Routes/Owner');

const memberRouter = require('../Routes/member')

const apiPrefix = '/api/v1';

app.use(`${apiPrefix}/auth`,authRouter);

app.use(`${apiPrefix}/admin`,adminRouter);

app.use(`${apiPrefix}/noauth`,noAuthRouter);

app.use(`${apiPrefix}/owner`,ownerRouter);

app.use(`${apiPrefix}/member`,memberRouter);