//* ================================================ Express App Configuration ================================================

// ===================== Importing necessary modules =====================
import path from "path";
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
import morganLogger from "./config/logger/HTTP-request-logger.js";
import generateSwaggerDocs from "./config/api-documentation/swagger-config.js";

// Express app configuration
const app = express();

// Middleware to log all HTTP requests using morgan library
app.use(morganLogger());

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

// Function to provide API Documentation from Swagger
generateSwaggerDocs(app);
// For API Documentation : GET method /api-docs
// For API Documentation in JSON format : GET method /api-docs.json

// Auth middleware to parse req.cookie and add req.currrentUser if a valid token is provided
app.use(currentUser);


//? ===================== API Routes Configuration =====================
// =====================V1 APIs Routes Configuration =================
app.use("/api/v1", v1APIs);


//? ===================== Configuring Frontend for Production =====================

if(process.env.NODE_ENV === 'production') {
  
  // Setting Frontend build directory as static directory
  const __dirname = path.resolve();
  const frontEndBuildDir = path.join(__dirname, 'frontend/dist');

  app.use(express.static(frontEndBuildDir));

  // ===================== Sending Index HTML page as response =====================
  
  const frontEndIndexPage = path.resolve(__dirname, 'frontend', 'dist', 'index.html');
  
  // Serve Home Page request
  app.get('/', (req, res) => {

    res.sendFile(frontEndIndexPage);

  });

  // Serve Admin Page request
  app.get('/admin', (req, res) => {

    res.sendFile(frontEndIndexPage);

  });

}


//? ===================== Error handling configuration =====================

// Resource Not Found Error Handler Configuration for Routes
app.all("*", () => {
  throw new NotFoundError();
});

// Custom Error Handler Configuration
app.use(errorHandler);


export { app };
