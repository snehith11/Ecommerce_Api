const path= require("path");
const dbConfig = require(path.join(__dirname,"../config/db.config.js"));

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.product = require(path.join(__dirname,"./product.model.js"))(mongoose);

module.exports = db;