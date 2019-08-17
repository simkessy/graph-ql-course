const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// dummy data
const books = [
  { name: "book 1", genre: "cats", id: "1" },
  { name: "book 2", genre: "dogs", id: "2" },
  { name: "book 3", genre: "cats", id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
