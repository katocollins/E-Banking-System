require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const client = require('prom-client');
//const cors = require("cors");


const app = express();

//connect to mongodb
const { connectToMongoose } = require("./config/db");

//middlewares
//express json parser middleware
app.use(express.json());

//cors middleware
//const { corsProOptions } = require("./config/corsConfig");
//app.use(cors(corsProOptions));

// Apply the rate limiting middleware to API calls only
const {
  apiLimiter,
} = require("./middlewares/rateLimitMiddleware/rateLimitMiddleware");
app.use("/api", apiLimiter);

//users Router
const usersRoute = require("./routes/usersRoutes");
app.use("/api/users", usersRoute);

//admins Router
const adminsRoute = require("./routes/adminRoutes");
app.use("/api/admins", adminsRoute);

//account Router
const accountRoute = require("./routes/accountRoutes");
app.use("/api/account", accountRoute);

//account requests Router
const accountRequestRoute = require("./routes/accountRequestRoutes");
app.use("/api/request", accountRequestRoute);

//serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "Frontend", "dist", "index.html")
    )
  );
}

connectToMongoose()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
// Enable default metrics collection (e.g., CPU, memory)
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom application metrics example
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests made',
});

// Increment counter each time a request is received
app.use((req, res, next) => {
  requestCounter.inc();
  next();
});

// Route to expose metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});
