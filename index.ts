import fastify, { FastifyInstance } from 'fastify'; 
import userController from './practice/controllers/userController'
import DBConnection from '@fastify/mongodb'
const app: FastifyInstance = fastify({ logger: false})

interface IQueryInterface {
  username: string,
  password: string 
}

interface IHeaders {
  'x-access-token': string
}

interface IReply {
  code: number 
  message: string 
  body: any 
}
app.register(DBConnection, {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  url: 'mongodb://localhost:27017/vertrical'
})
app.post<{Querystring: IQueryInterface, Headers: IHeaders, 
Reply: IReply}>("/users", userController)

app.put<{Querystring: IQueryInterface, Headers: IHeaders, 
Reply: IReply}>("/users", userController)

app.get<{Querystring: IQueryInterface, Headers: IHeaders, 
Reply: IReply}>("/users", async(req, res)=>{
  const result = app.mongo.client.db('vertrical').collection('nodb-api-v1');
  console.log(result);   
  // Or this.mongo.client.db('mydb').collection('users')

  return {
    code: 200 ,
    message: "Success",
    body: "any" }
})


app.patch<{Querystring: IQueryInterface, Headers: IHeaders, 
Reply: IReply}>("/users", userController)    

app.get<{Querystring: IQueryInterface, Headers: IHeaders, 
  Reply: IReply}>("/db", connectToDatabase)    
/**End */
/**Start MongoDB */
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
export const collections: { games?: mongoDB.Collection } = {}
export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb://localhost:27017");
          
  await client.connect();
      
  const db: mongoDB.Db = client.db("vertrical");
 
  const gamesCollection: mongoDB.Collection = db.collection("users");

  collections.games = gamesCollection;
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
  const games = (await collections.games.find({}).toArray());
  console.log(games)
}

 
/**End MongoDB */
app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})