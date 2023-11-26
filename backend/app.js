//* ================================================ Express App Configuration ================================================

// ===================== Importing necessary modules =====================
import express from "express";

import cookieParser from "cookie-parser";

// Custom Authentication & Error middleware from my npm package.
// Reference: https://www.npmjs.com/package/base-auth-handler
import { currentUser } from "base-auth-handler";
import { NotFoundError, errorHandler } from "base-error-handler";

// ===================== Importing necessary files =====================
import v1APIs from "./routes/api-v1-routes.js";

import apiSpeedLimiter from "./config/api-rate-limiter/api-speed-limiter.js";
import apiRateLimiter from "./config/api-rate-limiter/api-rate-limiter.js";
import { getServerHealth } from "./controllers/generalController.js";

// Express app configuration
const app = express();

// ===================== Setting Rate Limit for API Calls =====================
// Speed limiter for api calls.
app.use(apiSpeedLimiter);

// Rate limiter for api calls.
app.use(apiRateLimiter);

// ===================== Setting Static Folder =====================
app.use(express.static("backend/Public"));

// ========================================== Middleware's ==========================================

app.use(cookieParser()); // CookieParser Middleware

app.use(express.json()); // Body parser Middleware from Express

app.use(express.urlencoded({ extended: true })); // Form Data parser Middleware from Express

//? ===================== General Routes =====================
app.get("/health", getServerHealth); // Get server health information


// Auth middleware to parse req.cookie and add req.currrentUser if a valid token is provided
app.use(currentUser);


//? ===================== API Routes Configuration =====================
// =====================V1 APIs Routes Configuration =================
app.use("/api/v1", v1APIs);


//? ===================== Error handling configuration =====================

// Resource Not Found Error Handler Configuration for Routes
app.all("*", () => {
  throw new NotFoundError();
});

// Custom Error Handler Configuration
app.use(errorHandler);


export { app };
