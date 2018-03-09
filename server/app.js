// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const koaRouter = require('koa-router')();
const json = require('koa-json');
const logger = require('koa-logger'); // 引入各种依赖
const jwt = require('koa-jwt');
// mysql
const auth = require('./routes/auth.js'); // 引入auth
const colorDisk = require('./routes/colorDisk.js'); // 引入auth

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(require('koa-bodyparser')());

app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

app.use(async (ctx, next) => { //  如果JWT验证失败，返回验证失败信息
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access',
      };
    } else {
      throw err;
    }
  }
});

app.on('error', (err) => {
  console.log('server error', err);
});

// 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
koaRouter.use('/auth', auth.routes());
// 所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致
koaRouter.use('/color', jwt({ secret: 'vue-koa-demo' }), colorDisk.routes());


app.use(koaRouter.routes()); // 将路由规则挂载到Koa上。

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');

module.exports = app;
