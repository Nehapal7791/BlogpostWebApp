import mongoose from "mongoose";
import config from "./src/config/config.js";
import app from "./src/app.js";

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Connected to Database...");
    app.on("error", (err) => {
      console.log("Error: ", err);
      throw err;
    });
    const onListening = () => {
      console.log(`Listening on port number :${config.PORT}`);
    };
    app.listen(config.PORT, onListening);
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
})();
