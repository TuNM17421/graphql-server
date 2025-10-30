const { UserInputError, ApolloError } = require('apollo-server');

// Dữ liệu giả
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
    triggerError: (_, { type }) => {
      if (type === 'NOT_FOUND') {
        throw new UserInputError('Resource not found', {
          http: { status: 404 },
        });
      } else if (type === 'INTERNAL_SERVER_ERROR') {
        throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR', {
          http: { status: 500 },
        });
      } else {
        throw new Error('An unexpected error occurred.');
      }
    },
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = { title, author };
      books.push(newBook);
      return newBook;
    },
  },
};

module.exports = resolvers;
