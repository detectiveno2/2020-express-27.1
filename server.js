// server.js
// where your node app starts

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const cookieParser = require("cookie-parser");

const app = express();

// Routes
const usersRoute = require("./routes/users.route");
const booksRoute = require("./routes/books.route");
const transactionsRoute = require("./routes/transactions.route");
const authRoute = require("./routes/auth.route");
const profileRoute = require("./routes/profile.route");
const cartRoute = require("./routes/cart.route");

const apiLoginRoute = require("./api/routes/login.route");
const apiTransactions = require('./api/routes/transactions.route');

const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/login", apiLoginRoute);
app.use('/api/transactions', apiTransactions);

app.use(cookieParser("h29cr637cth45g6"));

app.use(express.static("public"));
app.use(sessionMiddleware);

app.use("/users", authMiddleware.requireAuth, usersRoute);
app.use("/books", booksRoute);
app.use("/transactions", authMiddleware.requireAuth, transactionsRoute);
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/cart", cartRoute);

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
