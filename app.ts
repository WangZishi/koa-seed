'use strict';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';
import * as log4js from 'log4js';
import * as fs from 'fs';
import * as assert from 'assert';
import { MongoClient } from 'mongodb';
import { Mongoose, Schema } from 'mongoose';
import { isMaster, fork, on } from 'cluster'
import { cpus } from 'os';
// import { UserController } from './controllers/user-controller'

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'app.log', category: 'app' }
    ]
});
const appLog = log4js.getLogger('app');
const mongoLog = log4js.getLogger('mongoose');

appLog.info(`Starting application in ${process.env.NODE_ENV} mode.`);

const dbUri = 'mongodb://localhost:27017/test';

if (isMaster && process.env.NODE_ENV == "production") {
    appLog.info(`Master node ${process.pid} online!`);
    cpus().forEach(() => fork());
    on('online', (worker, code, signal) => appLog.info(`Slave node ${worker.process.pid} online!`))
    on('exit', (worker, code, signal) => appLog.info(`Slave node ${worker.process.pid} died!`));
} else {
    const mongoose = new Mongoose();
    mongoose.connect(dbUri);
    const db = mongoose.connection;
    db.on('error', () => mongoLog.error(`MongoDb connection error!`));
    db.on('open', () => mongoLog.info(`MongoDb conection has been established.`));
    db.on('close', () => mongoLog.warn(`MongoDb conection has been closed!`));

    const UserSchema = new Schema({
        name: String,
        password: String
    })

    const User = mongoose.model('User', UserSchema);
    // console.log({User})
    let user = new User({ name: 'WangZishi', password: '111' });
    user.save((err, result) => {
        console.log({result})
    })
    // User.save();
    User.find({}, (err, users) => {
        user.get
        console.log({users});
    });
    
    // MongoClient.connect(dbUri, (err, db) => {
    //     assert.equal(null, err);
    //     appLog.info(`Connected correctly to server@${dbUri}`);
    //     const app = new Koa();
    //     app.use(logger());

    //     app.use(new UserController(db).routes());

    //     // response
    //     app.use(ctx => {
    //         ctx.body = 'Hello World!';
    //     });

    //     app.listen(3000);

    //     appLog.info('Server is listening on port 3000...');
    // });
}
