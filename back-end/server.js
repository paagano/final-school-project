// Standard code required to start building an APi in node js:
const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();
const createError = require("http-errors");
const morgan = require("morgan"); // Logging Middleware

// Connecting to the GUI/Frontend:
let corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

const CardsRoutes = require("./routes/cardsRoutes");
const BranchesRoutes = require("./routes/branchesRoutes");
const TellersRoutes = require("./routes/tellerRoutes");
const RolesRoutes = require("./routes/rolesRoutes");
const UsersRoutes = require("./routes/usersRoutes");
const OrdersRoutes = require("./routes/ordersRoutes");
const HeadOfficeReceiveStockRoutes = require("./routes/headOfficeRecieveStockRoutes");
const HeadOfficeHandStockToCourier = require("./routes/transitRoutes");
const BranchReceiveStockFromCourier = require("./routes/transitRoutes");
const BranchHandStockToCourier = require("./routes/transitRoutes");
const BranchAdminHandStockToTeller = require("./routes/tellerStocksRoutes");
const TellerReturnStockToBranchVoult = require("./routes/tellerStocksRoutes");
const TellerIssueCardToCustomer = require("./routes/tellerStocksRoutes");
const TellerCaptureSpoiltCard = require("./routes/tellerStocksRoutes");
const TillsRoutes = require("./routes/tillsRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined")); // For enhanced logging

//Using the routes:
app.use("/api/cards", CardsRoutes);
app.use("/api/branches", BranchesRoutes);
app.use("/api/roles", RolesRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/orders", OrdersRoutes);
app.use("/api/orders", HeadOfficeReceiveStockRoutes);
app.use("/api/stock", HeadOfficeHandStockToCourier);
app.use("/api/stock", BranchReceiveStockFromCourier);
app.use("/api/stock", BranchHandStockToCourier);
app.use("/api/tellers", TellersRoutes);
app.use("/api/voult", BranchAdminHandStockToTeller);
app.use("/api/voult", TellerReturnStockToBranchVoult);
app.use("/api/tills", TellerIssueCardToCustomer);
app.use("/api/tills", TellerCaptureSpoiltCard);
app.use("/api/tills", TillsRoutes);

const PORT = process.env.PORT || 7000;

function serverPort() {
  console.log(`Server Listening on http://localhost:${PORT}`);
}

// handling error 404
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

//Error Handlers:
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log to console
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, serverPort);
