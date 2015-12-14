import * as Koa from 'koa';
import * as fs from 'fs';

const app = new Koa();

// logger
app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const end = new Date;
  const ms = end.getMilliseconds() - start.getMilliseconds();
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);

console.log('start server on port 3000')