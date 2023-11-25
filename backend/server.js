//* ===================================================== Server Configuration =====================================================

// ===================== Configuring Environment Variables =====================
import dotenv from "dotenv";
dotenv.config();

// Express app configuration
import { app } from "./app.js";

import connectDB from "./config/dbConfig.js";

const startServer = () => {
  // Check if ENV Variables exist
  if (!process.env.APPLICATION_NAME) {
    throw new Error(`APPLICATION_NAME must be defined in ENV !!!`);
  }
  if (!process.env.PORT) {
    throw new Error(`PORT must be defined in ENV !!!`);
  }
  if (!process.env.NODE_ENV) {
    throw new Error(`NODE_ENV must be defined in ENV !!!`);
  }
  if (!process.env.JWT_KEY) {
    throw new Error(`JWT_KEY must be defined in ENV !!!`);
  }
  if (!process.env.JWT_TOKEN_DURATION) {
    throw new Error(`JWT_TOKEN_DURATION must be defined in ENV !!!`);
  }
  if (!process.env.MONGO_DB_URI) {
    throw new Error(`MONGO_DB_URI must be defined in ENV !!!`);
  }
  if (!process.env.ADMIN_REGISTRATION_KEY) {
    throw new Error(`ADMIN_REGISTRATION_KEY must be defined in ENV !!!`);
  }
  // Server port configuration
  const PORT = process.env.PORT || 5000;

  // ===================== Database Configuration =====================
  connectDB();

  //NOTE ===================== Starting Server =====================
  app.listen(PORT, () => {
    console.log(
      `${process.env.APPLICATION_NAME} SERVER is LIVE & Listening on PORT ${PORT} !!!`
    );
  });
};

// Starting server
startServer();
