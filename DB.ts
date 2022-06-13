
import * as mongoDB from "mongodb";
export const collections: { users?: mongoDB.Collection } = {}
export async function connectToDatabase (req: any, reply: any) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb://localhost:27017");
          
  await client.connect();
      
  const db: mongoDB.Db = client.db("vertrical");
 
  const usersCollection: mongoDB.Collection = db.collection("users");

  collections.users = usersCollection;
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
  const getUsers = (await collections.users.find({}).toArray());
  
//   console.log(getUsers)
  reply.status(200).send(getUsers)
}