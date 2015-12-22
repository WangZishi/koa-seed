// 'use strict'
// import * as Router from 'koa-router';
// import { User } from '../models/user';
// import { getLogger } from '../configurations/logs';

// const logger = getLogger('UserController');

// export class UserController {
//     private router: KoaRouter.IRouter;

//     constructor() {
//         this.router = new Router({
//             prefix: "/users"
//         });

//         this.router.get('/new', async (ctx, next) => {
//             let user = new User({ name: 'WangZishi', password: '12342' });
//             User.save()
//             // user.save
//             // user.save((err, result) => {
//             //     if (err != null) logger.error(err);
//             //     console.log(result);
                
//             // });
//             // await next();
//         });

//         this.router.get('/', async (ctx, next) => {
//             User.find({}).exec()
//                 .then(result => {
//                     console.log({ result});
//                 });
//             // await new Promise((resolve, reject) => {
//             //     User.find({}, (err, result) => {
//             //         if (err != null) reject(err);
//             //         resolve(result);
//             //     })
//             // })
//             //     .then(result => {
//             //         ctx.body = result;
//             //     })
//             //     .catch(err => {
//             //         logger.error(err);
//             //     });
            
//             // return await next();
//         });

//     }

//     routes() {
//         return this.router.routes()
//     }
// }