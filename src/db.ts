import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "",
  port: 5432,
  username: "",
  password: "",
  database: "typeorm_db",
  entities: [User, Post],
  logging: true,
  synchronize: true,
});

//
// "entities": ["src/entities/**/*.ts"],
// "migrations": ["src/migrations/**/*.ts"],
// "subscribers": ["src/subscribers/**/*.ts"],
// "cli": {
//   "entitiesDir": "src/entities",
//   "migrationsDir": "src/migrations",
//   "subscribersDir": "src/subscribers"
// }
