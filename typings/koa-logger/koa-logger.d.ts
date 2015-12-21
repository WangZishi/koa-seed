// Type definitions for koa-router v7.x
// Project: https://github.com/koajs/logger
// Definitions by: Wang Zishi <https://github.com/WangZishi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../node/node.d.ts" />/
/// <reference path="../koa/koa.d.ts" />

declare module KoaLogger {
    interface logger {
        (): Koa.IMiddleware;
    }
}

declare module 'koa-logger' {

    const _tmp: KoaLogger.logger;

    export = _tmp;
}