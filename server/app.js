const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// connect to db
mongoose.connect(
  "mongodb+srv://simkessy:mongoNaruto10!@cluster0-mzv9j.mongodb.net/test?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("CONNECTED TO DB");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("now listening on post 4000");
});
