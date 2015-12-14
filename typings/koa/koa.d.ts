// Type definitions for koa 2.x
// Project: http://koajs.com
// Definitions by: Wang Zishi <https://github.com/WangZishi/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/* =================== USAGE ===================

    import * as koa from "koa";
    const app = koa();

 =============================================== */

/// <reference path="../node/node.d.ts" />


declare module "koa" {
    import * as http from "http"
    import * as fs from "fs"
    // http.createServer()
    interface IApplication extends NodeJS.EventEmitter {
        proxy: boolean;
        middleware: Array<any>;
        subdomainOffset: number;
        env: any;
        context: any;
        request: any;
        response: any;
        listen(port: number, hostname?: string, backlog?: number, callback?: Function): http.Server;
        listen(port: number, hostname?: string, callback?: Function): http.Server;
        listen(path: string, callback?: Function): http.Server;
        listen(handle: any, listeningListener?: Function): http.Server;
        use(fn:IMiddleware): any;
    }
    
// delegate(proto, 'response')
//   .method('attachment')
//   .method('redirect')
//   .method('remove')
//   .method('vary')
//   .method('set')
//   .method('append')
//   .access('status')
//   .access('message')
////   .access('body')
//   .access('length')
//   .access('type')
//   .access('lastModified')
//   .access('etag')
//   .getter('headerSent')
//   .getter('writable');

// /**
//  * Request delegation.
//  */

// delegate(proto, 'request')
//   .method('acceptsLanguages')
//   .method('acceptsEncodings')
//   .method('acceptsCharsets')
//   .method('accepts')
//   .method('get')
//   .method('is')
//   .access('querystring')
//   .access('idempotent')
//   .access('socket')
//   .access('search')
////   .access('method')
//   .access('query')
//   .access('path')
////   .access('url')
//   .getter('origin')
//   .getter('href')
//   .getter('subdomains')
//   .getter('protocol')
//   .getter('host')
//   .getter('hostname')
//   .getter('header')
//   .getter('headers')
//   .getter('secure')
//   .getter('stale')
//   .getter('fresh')
//   .getter('ips')
//   .getter('ip');
    
    interface IContext {
        request: http.IncomingMessage;
        response: http.ServerResponse;
        app: IApplication;
        req: http.IncomingMessage;
        res: http.ServerResponse;
        ctx: IContext;
        
        url: string;
        method: string;
        
        body: {} | string;
        
        originalUrl: string;
        // cookie: 
    }
    
    interface IMiddleware {
        (ctx: IContext, next);
    }
    
    interface ApplicationStatic {
        new (): IApplication;
    }
    
    const _tmp: ApplicationStatic;
    
    export = _tmp;
}