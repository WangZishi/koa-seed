'use strict'
import * as Router from 'koa-router';

export class UserController {
    private router: KoaRouter.IRouter;

    constructor() {
        this.router = new Router({
            prefix: "/user"
        });

        this.router.get('/', async (ctx, next) => {
            const start = new Date;
            await next();
            ctx.body = "We are in '/user'!";
            const end = new Date;
            const ms = end.getMilliseconds() - start.getMilliseconds();
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
        });
    }

    routes() {
        return this.router.routes()
    }
}