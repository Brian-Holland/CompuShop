import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';

//initialize dotenv
dotenv.config();

connectDB();

//initialize express
const app = express();

app.get('/', (req, res) => {
	res.send('API is running');
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id);
	res.json(product);
});

//set port from .env file or default 5000
const PORT = process.env.PORT || 5000;

//listen on defined port and log status
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
