const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
const books = [
  { name: "book 1", genre: "cats", id: "1", authorId: "1" },
  { name: "book 2", genre: "dogs", id: "2", authorId: "2" },
  { name: "book 3", genre: "cats", id: "3", authorId: "3" },
  { name: "book 4", genre: "dogs", id: "4", authorId: "1" },
  { name: "book 5", genre: "thriller", id: "5", authorId: "1" },
  { name: "book 6", genre: "horror", id: "6", authorId: "2" },
  { name: "book 7", genre: "dogs", id: "7", authorId: "3" }
];

const authors = [
  { name: "author 1", age: 33, id: "1" },
  { name: "author 2", age: 23, id: "2" },
  { name: "author 3", age: 53, id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        console.log("parent:", parent);
        return authors.find(a => a.id === parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return books.filter(b => b.authorId === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        // code to get data
        const book = books.find(b => b.id === args.id);
        console.log(book);
        return book;
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        // code to get data
        const author = authors.find(b => b.id === args.id);
        console.log(author);
        return author;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
