const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors("*"));
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./utils/mongo");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// declaring the port if not given use port 5000
const port = process.env.PORT || 5000;

//applevel middleware
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//confogiring swagger
const swaggerOPtions = {
  swaggerDefinition: {
    info: {
      title: "Ecommerce App",
      description: "Ecommerce Website server template ",
    },
    contact: {
      name: "tatenda bako",
    },
    servers: ["http://localhost:5000"],
  },
  apis: [
    "./index.js",
    "./routes/auth/*.js",
    "./routes/user/*.js",
    "./routes/store/*.js",
    "./routes/product/*.js",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOPtions);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// connect database
connectDB();

app.get("/", (req, res) => {
  res.send({
    message: "Api for multivender ecommerce app called trolliey",
  });
});

//user defined routes
app.use("/api/auth/register", require("./routes/auth/register"));
app.use("/api/auth/login", require("./routes/auth/login"));
app.use("/api/auth/verify", require("./routes/auth/verify"));
app.use("/api/user", require("./routes/user/user"));
app.use('/api/store', require('./routes/store/store'))
app.use('/api/product', require('./routes/product/product'))
app.use('/api/order', require('./routes/order/order'))
app.use('/api/auth/reset-password', require('./routes/auth/reset-password'))


//not found handler
app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

//error handling middleware
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  console.log(error);
  res.send({
    message: error.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "you are in production"
        : error.stack,
  });
});

// the listener
app.listen(port, (err) => {
  if (err) {
    console.log("There was an error :- ", err);
  } else {
    console.log(`Server Up On Port ${port}`);
  }
});
