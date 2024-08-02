const crypto = require("crypto");

const consumerKey = crypto.randomBytes(32).toString("hex");
const consumerSecret = crypto.randomBytes(32).toString("hex");

console.table({ consumerKey, consumerSecret });
