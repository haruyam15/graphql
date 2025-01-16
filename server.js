const express = require('express');
const port = 4000;
const app = express();

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    description : String
    name : String
    }
  `);

const root = {
  description: '안녕하세요',
  name: '하은',
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
  })
);

app.listen(port, () => {
  console.log('4000 : good');
});
