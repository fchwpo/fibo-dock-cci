const keys = require('./keys')
const bodyparser = require('body-parser')
const cors = require('cors')
const redis = require('redis')
// Express App Setup
const express = require('express')
const app = express()
app.use(cors())
app.use(bodyparser.json())

// PG Client Setup
const { Pool } = require('pg')
console.log(keys);
const pgClient = new Pool({
	user: keys.PG_USER,
	host: keys.PG_HOST,
	database: keys.PG_DB,
	port: keys.PG_PORT,
})

pgClient.on('error', () => {
	console.log('Lost PostGres Connection')
})

pgClient.query('CREATE TABLE IF NOT EXISTS values_new (number INT)').catch((err) => {
	console.log('Table Creation Error', err)
})

// Redis Client Setup
const client = redis.createClient({
	host: keys.REDIS_HOST,
	port: keys.REDIS_PORT,
	retry_strategy: () => 1000
});
const redisPub = client.duplicate();

// Route Handlers
app.get('/', (req, res) => {
	res.send('Hi! User')
});

app.get('/values/all', async (req, res) => {
	const values = await pgClient.query('SELECT * from values_new');

	res.send(values.rows);
})

app.get('/values/current', async (req, res) => {
	client.hgetall('values', (err, values) => {
		if(err){
			console.log('Error Fetching Values From Redis')
		}
		res.send(values);
	})
})

app.post('/values', async (req, res) => {
	const index = +req.body.index;
	if(index > 40){
		return res.status(422).send('Index too high');
	}

	client.hset('values', index, 'Nothing Yet!');
	redisPub.publish('insert', index);
	pgClient.query('INSERT INTO values_new(number) VALUES($1)', [index]);

	res.send({
		working: true
	})
})

app.listen(keys.EXPRESS_PORT, () => {
	console.log(`App is Listening on ${keys.EXPRESS_PORT}`)
})
