const express = require('express');
const port = 4000;
const app = express();

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const users = [
  { id: '1', name: '하은' },
  { id: '2', name: 'Bob' },
];

const schema = buildSchema(`
  type Query {
    user : [User]
  }
  type User {
    id : String
    name : String
  }
  input UpdateUserInput {
    id: String
    name: String
  }
  type Mutation {
    updateUser(input:UpdateUserInput) : User
  }
`);

const rootValue = {
  user: () => {
    return users;
  },
  updateUser: ({ input }) => {
    const { id, name } = input;
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error('해당 아이디와 일치하는 사용자가 없습니다.');
    }
    if (name) user.name = name;
    return user;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log('4000 : good');
});
