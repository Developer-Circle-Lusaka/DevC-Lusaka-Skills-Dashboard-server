const express = require('express');
import  { ApolloServer, gql } from 'apollo-server-express'
import config from "./config"
import database from './database'
import developer from './models/developer'
import jobs from './models/jobs'



// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.

// Construct a schema, using GraphQL schema language

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type User {
    name: String
    age: String
    skills:String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    users: [User],
    jobs:[Job]
  }


  type Job {
    title:String,
    description:String,
    langauges:String
  }



  
`;

const  getUsers= async()=>{
    try {
        return await developer.find({})
    } catch (error) {
         console.log(error)
    }   

}


const getJobs= async()=>{
  try {
    return await jobs.find({})
  } catch (error) {
    console.log(error)
  }
}

const resolvers = {
    Query: {
      users:getUsers,
      jobs:getJobs,
    },
  };

// Provide resolver functions for your schema fields


const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: config.port }, () =>
  console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
);