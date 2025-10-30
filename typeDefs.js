const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    triggerError(type: String!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`;

module.exports = typeDefs;
