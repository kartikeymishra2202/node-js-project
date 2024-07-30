//API documentation

import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
// const express = require("express");
import express from "express";

import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
// import colors from "colors";
import testRoutes from "./routes/testRoutes.js";
//--------------------------security packages
import helmet from "helmet";
/////////////////////////////////////////////////

///sql query injection prevention
import ExpressMongoSanitize from "express-mongo-sanitize";
/////////////

import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import errorMiddelware from "./middleware/errorMiddleware.js";

import jobsRoutes from "./routes/jobsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//mongo connection
connectDB();

//swagger api config
//swagger api option

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "JOb Portal application",
      description: "Node Expressjs JOb portal Application",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const spec = swaggerDoc(options);

//rest object.
const app = express();

//middleware
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//router
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//validation   Middleware
app.use(errorMiddelware);

const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(`Node Server Running  ON PORT ${PORT}`);
});
