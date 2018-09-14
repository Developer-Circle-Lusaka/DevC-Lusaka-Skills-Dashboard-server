import express from 'express'
import  { ApolloServer, gql } from 'apollo-server-express'
import config from "./config"
import database from './database'
import Developer from './models/developer'
import jobs from './models/jobs'


const typeDefs = gql`

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    developers: [developer],
  }
  

  type skill{
    name:String,
    duration:String
  }


  input skillInput{
    name:String,
    duration:String
  }

  type project{
    title:String,
    description:String
  }

  input projectInput{
    title:String,
    description:String
  }

  

  type developer{
    name: String,
    projects:[project],
    skills:[skill],
    image:String,
    linkedIn:String,
    github:String,
  }

  type Mutation {
    registerDeveloper(name:String,projects:[projectInput],skills:[skillInput],linkdedIn:String,github:String,image:String): developer
  }
  
`;

const  getUsers= async()=>{
    try {
     const developers= await Developer.find({})
     return developers;
    } catch (error) {
         console.log(error)
    }   

}


const getJobs= async()=>{
  try {
    return await Developer.find({}).exec()
  } catch (error) {
    console.log(error)
  }
}

const registerDeveloper=async(root,args,context)=>{
  console.log("hallo",args)
  try {
    const res= await Developer.create(args)
    console.log(res)
    return res;
  } catch (error) {
    console.log(error)
    
  }
}

const resolvers = {
    Query: {
      developers:getUsers
    },
    Mutation:{
      registerDeveloper: registerDeveloper
    }
  };

// Provide resolver functions for your schema fields


const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: config.port }, () =>
  console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
);