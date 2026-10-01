import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then((data) => {
    console.log(" MongoDB connection successful");
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, function ()  {
    console.info(`The server is running successfully on port: ${PORT}`); 
    console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
