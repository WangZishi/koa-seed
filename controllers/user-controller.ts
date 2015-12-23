'use strict'
import * as Router from 'koa-router';
import { User } from '../models/user';
import { getLogger } from '../configurations/logs';

const logger = getLogger('UserController');

export class UserController {
    private router: KoaRouter.IRouter;

    constructor() {
        this.router = new Router({
            prefix: "/users"
        });

        this.router.get('/new', async (ctx, next) => {
            let user = new User({
                name: "LvWenhan",
                age: "21"
            });
            await user.save();
            await next();
        });

        this.router.get('/', async (ctx, next) => {
            await User.find({}).exec().then(result => ctx.body = result);
            await next();
        });

    }

    routes() {
        return this.router.routes()
    }
}