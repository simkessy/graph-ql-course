import React, { Component } from "react";
import { graphql } from "react-apollo";

// Queries
import { getAuthorsQuery } from "../queries";

class AddBooks extends Component {
  displayAuthors() {
    const { data } = this.props;

    if (data.loading) return <option disabled>Loading Authors...</option>;

    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }

  render() {
    return (
      <form id="add-book">
        <div className="field">
          <label>Book Name:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

// Wrap component around query
export default graphql(getAuthorsQuery)(AddBooks);
