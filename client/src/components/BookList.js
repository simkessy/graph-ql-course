import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
class BookList extends Component {
  displayBooks() {
    const { data } = this.props;

    if (data.loading) return <div>Loading Books...</div>;

    return data.books.map(book => {
      return <li key={book.id}>{book.name}</li>;
    });
  }
  render() {
    console.log(this.props);

    return (
      <div id="main">
        <ul id="book-list">{this.displayBooks()}</ul>
      </div>
    );
  }
}

// Wrap component around query
export default graphql(getBooksQuery)(BookList);
