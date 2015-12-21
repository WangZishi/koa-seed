// Type definitions for koa 2.x
// Project: http://koajs.com
// Definitions by: Wang Zishi <https://github.com/WangZishi/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/* =================== USAGE ===================

    import * as koa from "koa";
    const app = koa();

 =============================================== */

/// <reference path="../node/node.d.ts" />



declare module Koa {
    interface IMiddleware {
        <T>(ctx: any, next: any): void | Promise<T>;
    }
}


declare module "koa" {
    import {Server, IncomingMessage, ServerResponse} from 'http';

    interface ApplicationStatic {
        new (): IApplication;
    }

    interface IApplication extends NodeJS.EventEmitter {
        proxy: boolean;
        middleware: Array<any>;
        subdomainOffset: number;
        env: any;
        context: any;
        request: any;
        response: any;
        listen(port: number, hostname?: string, backlog?: number, callback?: Function): Server;
        listen(port: number, hostname?: string, callback?: Function): Server;
        listen(path: string, callback?: Function): Server;
        listen(handle: any, listeningListener?: Function): Server;
        use(fn: Koa.IMiddleware): any;
    }

    interface IContext {
        request: IncomingMessage;
        response: ServerResponse;
        app: IApplication;
        req: IncomingMessage;
        res: ServerResponse;
        ctx: IContext;

        url: string;
        method: string;

        body: {} | string;

        originalUrl: string;
        // cookie: 
    }
    const _tmp: ApplicationStatic;

    export = _tmp;
}