import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

// Queries
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries";

class AddBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthors() {
    const { getAuthorsQuery: data } = this.props;

    if (data.loading) return <option disabled>Loading Authors...</option>;

    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }

  submitForm(e) {
    e.preventDefault();

    const { name, genre, authorId } = this.state;

    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book Name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
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
// Note:  By wrapping the component in this, you're adding the queries to the this.props of the component to access the queries / mutations
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBooks);
