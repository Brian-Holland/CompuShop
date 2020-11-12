import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

//initialize dotenv
dotenv.config();

connectDB();

//initialize express
const app = express();

//mount routes to url
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
	res.send('API is running');
});

//set port from .env file or default 5000
const PORT = process.env.PORT || 5000;

//listen on defined port and log status
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
