const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const path= require("path");
const db=require(path.join(__dirname,"./app/models"));
const url="mongodb+srv://snehith:snehith5949@cluster0.syoay.mongodb.net/Ecommerce?retryWrites=true&w=majority";
db.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// var corsOptions = {
//   origin: "http://localhost:8080"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

require(path.join(__dirname,"./app/routes/product.routes"))(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});