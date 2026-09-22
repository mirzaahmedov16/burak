import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then((data) => {
    console.log(" MongoDB connection successful");
    const port = process.env.PORT || 3003;
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
