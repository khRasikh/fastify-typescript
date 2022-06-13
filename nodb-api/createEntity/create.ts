import * as mongoDB from "mongodb";
import { ObjectId } from "mongodb";
import { collections } from "./../../DB";
import dotenv from 'dotenv'; 
dotenv.config(); 
export async function getUsers(req: any, reply: any) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(`${process.env.DB_CONN_STRING}`
  );

  await client.connect();

  const db: mongoDB.Db = client.db(`${process.env.DB_NAME}`);

  const usersCollection: mongoDB.Collection = db.collection(`${process.env.COLLECTION_NAME}`);

  collections.users = usersCollection;
  

  const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const game = (await collections.users.findOne(query));

        if (game) {
            reply.status(200).send(game);
        }
    } catch (error) {
        reply.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}