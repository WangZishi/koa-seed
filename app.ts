import * as Koa from 'koa';
import * as fs from 'fs';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';
import * as log4js from 'log4js';
import { isMaster, fork, on } from 'cluster'
import { cpus } from 'os';
import { UserController } from './controllers/user-controller'

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'app.log', category: 'app' }
    ]
})
const log = log4js.getLogger('app');
log.info(`Starting application in ${process.env.NODE_ENV} mode.`);

if (isMaster && process.env.NODE_ENV == "production") {
    log.debug(`isMaster: ${isMaster}`);
    for (var i = 0; i < cpus().length; i++) {
        fork();
    }
    // cpus().forEach(() => fork());
    on('online', (worker, code, signal) => log.info(`worker ${worker.process.pid} online!`))
    on('exit', (worker, code, signal) => log.info(`worker ${worker.process.pid} died!`));
} else {
    const app = new Koa();
    app.use(logger());

    app.use(new UserController().routes());

    // response
    app.use(ctx => {
        ctx.body = 'Hello World!';
    });

    app.listen(3000);

    log.info('Server is listening on port 3000...');
}
