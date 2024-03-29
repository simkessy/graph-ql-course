import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Components
import BookList from "./components/BookList";
import AddBooks from "./components/AddBooks";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Ninja's Reading List</h1>
          <BookList />
          <AddBooks />
        </div>
      </ApolloProvider>
    );
  }
}
