// Import OpenTelemetry instrumentation modules first
import "@azure/opentelemetry-instrumentation-azure-sdk";
import "@opentelemetry/instrumentation-mongodb";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import connectToMongoDB from "./mongodb.js";
import dotenv from "dotenv";
dotenv.config();
import appInsights from "applicationinsights";

appInsights
  .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoCollectRequests(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectConsole(true, false)
  .setAutoCollectPreAggregatedMetrics(true)
  .enableWebInstrumentation(false)
  .start();

const app = express();
const port = process.env.PORT_NUMBER || 3000;

//  Middleware initializations
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Track all requests
app.all("/*", function (req, res, next) {
  console.log("-------------- New Request --------------");
  appInsights.defaultClient.trackRequest({
    request: req,
    response: res,
  });
  next(); // Continue to the next handler
});

// Api routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

// server information
connectToMongoDB();

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
