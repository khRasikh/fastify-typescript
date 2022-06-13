import * as mongoDB from "mongodb";
import { ObjectId } from "mongodb";
import { collections } from "./../../DB";
import dotenv from 'dotenv'; 
dotenv.config(); 
export async function deleteUser(req: any, res: any) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(`${process.env.DB_CONN_STRING}`
  );

  await client.connect();

  const db: mongoDB.Db = client.db(`${process.env.DB_NAME}`);

  const usersCollection: mongoDB.Collection = db.collection(`${process.env.COLLECTION_NAME}`);

  collections.users = usersCollection;
  

  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.users.deleteOne(query);

    if (result && result.deletedCount) {
        res.status(202).send(`Successfully removed user with id ${id}`);
    } else if (!result) {
        res.status(400).send(`Failed to remove user with id ${id}`);
    } else if (!result.deletedCount) {
        res.status(404).send(`User with id ${id} does not exist`);
    }
} catch (error) {
    console.error(error);
    res.status(400).send(error);
}
}