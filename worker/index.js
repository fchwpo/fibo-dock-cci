const redis = require('redis');
const {
	REDIS_HOST,
	REDIS_PORT
} = require('./keys');

console.log('In worker');
const client = redis.createClient({
	host: REDIS_HOST,
	port: REDIS_PORT,
	retry_strategy: () => 1000
})

const sub = client.duplicate();

function fib(index){
	if(index < 2)
		return 1
	return fib(index - 1) + fib(index - 2)
}

sub.on('message', (channel, message) => {
	console.log('Worker')
	client.hset('values', message, fib(parseInt(message)));
})

sub.subscribe('insert');
console.log('End Worker')