import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';
import * as log4js from 'log4js';
import * as fs from 'fs';
import * as assert from 'assert';
import { MongoClient } from 'mongodb';
import { isMaster, fork, on } from 'cluster'
import { cpus } from 'os';
import { UserController } from './controllers/user-controller'

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'app.log', category: 'app' }
    ]
});
const log = log4js.getLogger('app');
log.info(`Starting application in ${process.env.NODE_ENV} mode.`);

const dbUri = 'mongodb://localhost:27017/test';

if (isMaster && process.env.NODE_ENV == "production") {
    log.info(`Master node ${process.pid} online!`);
    cpus().forEach(() => fork());
    on('online', (worker, code, signal) => log.info(`Slave node ${worker.process.pid} online!`))
    on('exit', (worker, code, signal) => log.info(`Slave node ${worker.process.pid} died!`));
} else {
    MongoClient.connect(dbUri, (err, db) => {
        assert.equal(null, err);
        log.info(`Connected correctly to server@${dbUri}`);
        const app = new Koa();
        app.use(logger());

        app.use(new UserController(db).routes());

        // response
        app.use(ctx => {
            ctx.body = 'Hello World!';
        });

        app.listen(3000);

        log.info('Server is listening on port 3000...');
    });
}
