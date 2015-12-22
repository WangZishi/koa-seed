'use strict';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Koalogger from 'koa-logger';

import { isMaster, fork, on } from 'cluster'
import { cpus } from 'os';
import { getLogger } from './configurations/logs';
import { db, mongoose } from './configurations/mongodb';
import { Schema } from 'mongoose';
// import { UserController } from './controllers/user-controller';

// import { User } from './models/user';
// import * as User1 from './models/user';

const logger = getLogger();
logger.info(`Starting application in ${process.env.NODE_ENV} mode.`);

if (isMaster && process.env.NODE_ENV == "production") {
    logger.info(`Master node ${process.pid} online!`);
    cpus().forEach(() => fork());
    on('online', (worker, code, signal) => logger.info(`Slave node ${worker.process.pid} online!`))
    on('exit', (worker, code, signal) => logger.info(`Slave node ${worker.process.pid} died!`));
} else {

    const app = new Koa();
    app.use(Koalogger());

    const UserSchema = new Schema({
        name: String,
        password: String
    })

    const User = mongoose.model('User', UserSchema);
    User.find({}).exec().then(console.log);
    // console.log({User})
    // let user = new User({ name: 'WangZishi', password: '111' });
    // user.save((err, result) => {
    //     console.log({ result })
    // })
    // User.save();
    // User.find({}, (err, users) => {
    //     user.get
    //     console.log({ users });
    // });

    

    
    // app.use(new UserController().routes());
    // app.use(async (ctx, next) => {
    //     console.log(ctx.path)
    //     if (ctx.path != '/uses/') await next();
    //     User.find({}, (err, result) => console.log(result));
    //     // /*ctx.body = */User.find({}).exec();
    // })

    // // response
    // app.use(ctx => {
    //     ctx.body = 'Hello World!';
    // });

    app.listen(3000);

    logger.info('Server is listening on port 3000...');
}
