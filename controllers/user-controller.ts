'use strict'
import * as Router from 'koa-router';
import { Db, Collection, } from 'mongodb';

export class UserController {
    private router: KoaRouter.IRouter;
    private db: Db

    constructor(db: Db) {
        this.db = db;

        this.router = new Router({
            prefix: "/users"
        });

        this.router.get('/new', async (ctx, next) => {

            this.db.collection('users', (err, collection) => {
                collection.insertOne({
                    user: 'wangzishi',
                    password: '111'
                }, (err, result) => {
                    ctx.body = `result: ${result}`;
                })
            });
            await next();

        });

        this.router.get('/', async (ctx, next) => {
            this.db.collection('users', (err, collection) => {
                collection.find((err, result) => {
                    result.toArray((err, result) => {
                        ctx.body = result;
                    })
                })
            });
        });

    }

    routes() {
        return this.router.routes()
    }
}