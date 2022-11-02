const express = require('express');
const { apolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

server.applyMiddleware({ app });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new apolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
})

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
