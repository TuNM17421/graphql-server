const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Import plugin để xử lý status code
const { formatError } = require('./errorFormatter');

async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError, // Sử dụng hàm formatError tùy chỉnh
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(), // Sử dụng playground cũ để dễ test hơn
    ]
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  });
}

startServer();
