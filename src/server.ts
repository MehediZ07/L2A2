import express from "express";
import config from "./config";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running!",
    port: config.port
  });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});