import React, { Component } from "react";
import { graphql } from "react-apollo";

// components
import BookDetails from "./BookDetails";

// Queries
import { getBooksQuery } from "../queries";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  displayBooks() {
    const { data } = this.props;

    if (data.loading) return <div>Loading Books...</div>;

    return data.books.map(book => {
      return (
        <li
          key={book.id}
          onClick={e => {
            this.setState({ selected: book.id });
          }}
        >
          {book.name}
        </li>
      );
    });
  }
  render() {
    return (
      <div id="main">
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

// Wrap component around query
export default graphql(getBooksQuery)(BookList);
