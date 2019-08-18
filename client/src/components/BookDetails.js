import React, { Component } from "react";
import { graphql } from "react-apollo";

// Queries
import { getBookQuery } from "../queries";

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;

    if (book) {
      return (
        <div id="book-details">
          <hr />
          <h2>Title: {book.name}</h2>
          <p>Genre: {book.genre}</p>
          <p>Author: {book.author.name}</p>
          <h5>Other Books</h5>
          <ul className="other-books">
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <hr />
        </div>
      );
    }

    return (
      <div id="book-details">
        <p>Output book details here</p>
      </div>
    );
  }
  render() {
    return this.displayBookDetails();
  }
}

// Wrap component around query
export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
