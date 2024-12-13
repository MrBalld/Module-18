import {gql} from "graphql-tag";

const typeDefs = gql`
    type User{
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }
    type Auth {
        token: ID!
        user: User
    }
    input BookInput{
        authors: [Strings]
        description: String
        bookId: String!
        image: String
        link: String
        title: String!
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, passowrd: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }
`;

export default typeDefs;
