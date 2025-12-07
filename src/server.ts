import express from "express";
import config from "./config";
import { initDB } from "./config/database";
import authRoutes from "./modules/auth/auth.routes";
import vehicleRoutes from "./modules/vehicles/vehicles.routes";
import userRoutes from "./modules/users/users.routes";
import bookingRoutes from "./modules/bookings/bookings.routes";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  next();
});

initDB().then(() => {
}).catch(console.error);

app.get("/", (req, res) => {
  res.json({
    message: "Express Server Vehicle Rental API is running",
    version: "1.0.0"
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(config.port, () => {

});