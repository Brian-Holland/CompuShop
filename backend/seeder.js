import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		//clear entire db using all 3 schemas
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		//insert users from users.js using user schema
		const createdUsers = await User.insertMany(users);

		//store admin as variable from user list
		const adminUser = createdUsers[0]._id;

		//add admin to the admin field on products schema
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		//add sample products from above to the db using produect schema
		await Product.insertMany(sampleProducts);

		console.log('data imported');
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		//clear entire db using all 3 schemas
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log('data destroyed');
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

//if flag is passed in when run, destroy data, otherwise import
if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
