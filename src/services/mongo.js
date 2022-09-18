const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connection.once("open", () => {
      console.log("MongoDB connection ready!");
    });

    mongoose.connection.on("error", (err) => {
      console.error(err);
    });

    mongoose.connect(MONGO_URL, connectionParams);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};
