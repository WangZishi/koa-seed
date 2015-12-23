'use strict';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Koalogger from 'koa-logger';

import { isMaster, fork, on } from 'cluster'
import { cpus } from 'os';
import { getLogger } from './configurations/logs';
import { db, mongoose } from './configurations/mongodb';
// import { Schema } from 'mongoose';
import { UserController } from './controllers/user-controller';

import { UserSchema } from './models/user';

const logger = getLogger('app');
const NODE_ENV = process.env.NODE_ENV || 'production';
logger.info(`Starting application in ${NODE_ENV} mode.`);

if (isMaster && NODE_ENV == "production") {
    logger.info(`Master node ${process.pid} online!`);
    cpus().forEach(() => fork());
    on('online', (worker, code, signal) => logger.info(`Slave node ${worker.process.pid} online!`))
    on('exit', (worker, code, signal) => logger.info(`Slave node ${worker.process.pid} died!`));
} else {

    const app = new Koa();
    app.use(Koalogger());

    app.use(new UserController().routes());

    app.listen(3000);

    logger.info('Server is listening on port 3000...');
}
