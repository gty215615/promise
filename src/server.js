const Koa = require('koa')

const app = new Koa()


app.use((ctx)=>{
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.body = 'Hello Koa!'
})

app.listen(3000,()=>{
    console.log('server is running 3000!');
})