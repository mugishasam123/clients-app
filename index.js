import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import client from "./routes/clients.routes.js";
import provider from "./routes/providers.routes.js";

const app = express();

const db_uri = process.env.DB_URI;
const port = process.env.PORT;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clients-Providers api",
      version: "1.0.0",
      description: "This is an api for clients-providers app",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./api-docs/*.js"],
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));

mongoose.connect(
  db_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err
      ? console.log("db connection error", err.message)
      : console.log("database connected successfully");
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "database connection timed out"));
app.use(cors());
app.use(express.json());
app.use("/api/clients", client);
app.use("/api/providers", provider);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("frontend/dist"));
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, console.log(`server is running at ${port}`));
