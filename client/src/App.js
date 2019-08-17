import React, { Component } from "react";
import BookList from "./components/BookList";

export default class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
      </div>
    );
  }
}
