process.env.MONGO_URI = "mongodb+srv://ckato:Ckato141%40@e-bank.mj9hv.mongodb.net/?retryWrites=true&w=majority&appName=E-Bank";
process.env.CORS_DOMAINS = "http://localhost:3000";

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToMongoose = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Mongoose Through ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectToMongoose,
};
