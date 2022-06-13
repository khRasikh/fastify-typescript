import * as mongoDB from "mongodb";
import { ObjectId } from "mongodb";
import { collections } from "./../../DB";
export async function getUsers(req: any, reply: any) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb://localhost:27017"
  );

  await client.connect();

  const db: mongoDB.Db = client.db("vertrical");

  const usersCollection: mongoDB.Collection = db.collection("users");

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