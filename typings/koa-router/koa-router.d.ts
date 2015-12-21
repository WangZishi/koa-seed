// Type definitions for koa-router v7.x
// Project: https://github.com/alexmingoia/koa-router
// Definitions by: Wang Zishi <https://github.com/WangZishi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../node/node.d.ts" />
/// <reference path="../koa/koa.d.ts" />

declare module KoaRouter {
    interface ILayer {
        match(path: string): boolean;
        params(path: string, captures, existingParams): {};
        captures()
        url()
        param()
        setPrefix()
    }

    interface IRouter {
        get: IRouterMethod;
        put: IRouterMethod;
        patch: IRouterMethod;
        post: IRouterMethod;
        delete: IRouterMethod;

        routes(): Koa.IMiddleware;

        use(path: string[], ...middleware: Koa.IMiddleware[]): IRouter;
        prefix(prefix: string): IRouter;
        allowedMethods(opts: IAllowedMethodsOptions): Koa.IMiddleware;
        redirect(source: string, destination: string, status: number): IRouter;
        route(name: string): ILayer | boolean;
        url(name: string, params: {}): string | Error;
        param(param: string, middleware: Koa.IMiddleware): IRouter;
    }

    interface IRouterMethod {
        (path: string | RegExp, ...middleware: Koa.IMiddleware[]): IRouter;
        (name: string, path: string | RegExp, ...middleware: Koa.IMiddleware[]): IRouter;
    }

    interface IAllowedMethodsOptions {
        throw?: boolean;
        notImplemented?: Function;
        methodNotAllowed?: Function;
    }

    interface IOptions {
        prefix?: string;
    }

    interface RouterStatic {
        new (): IRouter;
        new (opts: IOptions): IRouter;
        url(path: string, params: string): string;
    }
}

declare module 'koa-router' {

    const _tmp: KoaRouter.RouterStatic;

    export = _tmp;
}