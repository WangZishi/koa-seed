import * as Koa from 'koa';
import * as fs from 'fs';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';
import * as log4js from 'log4js';

import {UserController} from './controllers/user-controller'
const app = new Koa();
const user = new UserController();
log4js.configure({
 appenders: [
   { type: 'console' },
   { type: 'file', filename: 'app.log', category: 'app' }
  ]
})
const log = log4js.getLogger('app');


// logger
app.use(logger());

app.use(user.routes());

// response
app.use(ctx => {
    ctx.body = 'Hello World!';
});

app.listen(3000);

log.info(`start server on port 3000`);