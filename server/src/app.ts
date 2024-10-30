import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./config/passport"; // Passport config

// Routes
import authRoute from "./routes/auth";
import contractsRoute from "./routes/contract";
import paymentsRoute from "./routes/payments";
import { handleWebhook } from "./controllers/payment.controller";

const app = express();

// Add this before other middleware
app.set('trust proxy', 1);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Frontend URL from environment variable
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add explicit methods
  })
);

app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging

// Raw body parsing for webhook
app.post(
  "/payments/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);

app.use(express.json()); // JSON parsing for requests

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET!, // Secret for signing cookies
    resave: false, // Avoid saving unmodified sessions
    saveUninitialized: false, // Avoid saving uninitialized sessions
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI! }), // MongoDB session store
    cookie: {
      secure: process.env.NODE_ENV === "production", // Only HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-site cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true, // Prevent client-side access to the cookie
      domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : undefined // Add your domain in production
    },
  })
);

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoute);
app.use("/contracts", contractsRoute);
app.use("/payments", paymentsRoute);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
