import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./db";

async function createConnection() {
  try {
    await AppDataSource.initialize();
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

createConnection();
