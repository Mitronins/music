const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-parser')();
const mongoose = require('mongoose');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost/test';

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('ura yopt')
});

const server = new Koa();
const router = new Router();

router.get('/', ctx => ctx.body = 'pa is my 1');

router.post('/story', bodyParser, ctx => ctx.body = ctx.request.body);

const kittySchema = new mongoose.Schema({
   name: String
});

kittySchema.methods.speak = function () {
   const greeting = this.name
       ? "Meow name is " + this.name
       : "I don't have a name";
   console.log(greeting);
};

const Kitten = mongoose.model('Kitten', kittySchema);
const silence = new Kitten({ name: 'Silence' });
// silence.save(function (err, fluffy) {
//    if (err) return console.error(err);
//    fluffy.speak();
// });
Kitten.findOne({ name: 'Silence'}, function (err, kitten) {
   if (err) return console.error(err);
   console.log(kitten);
});

server
    .use(logger('tiny'))
    .use(router.routes())
    .listen(3000);
