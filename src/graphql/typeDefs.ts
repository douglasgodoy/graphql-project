export const typeDefs = `
  type UpdateResponse {
    error: Boolean
    newUsername: String
  }

  interface Node {
    id: ID!
  }

  type User implements Node {
    id: ID!
    name: String
    age: Int
  }

  type Query {
    node(id:ID!):Node
    users: [User]
    user(name: String!): User
  }

  type Mutation {
    addUser(name: String, age: Int): User!
    updateUsername(id:ID!,username:String!):UpdateResponse!
  }
`;
