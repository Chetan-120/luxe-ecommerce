const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

const Product = require("./models/Product");
const products = require("./data/products");

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("✅ Products Imported Successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Seeder Error:", error);
    process.exit(1);
  }
};

importData();