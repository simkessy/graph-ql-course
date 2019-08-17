const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const env = require("./env");

const app = express();

// connect to db
mongoose.connect(env.dbUrl);

mongoose.connection.once("open", () => {
  console.log("CONNECTED TO DB");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("now listening on post 4000");
});
