import * as mongoDB from "mongodb";
import { ObjectId } from "mongodb";
import { collections } from "./../../DB";
import dotenv from 'dotenv'; 
import { FastifyReply } from "fastify";
dotenv.config(); 
export async function getUsers(req: any, res: FastifyReply) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(`${process.env.DB_CONN_STRING}`
  );

  await client.connect();

  const db: mongoDB.Db = client.db(`${process.env.DB_NAME}`);

  const usersCollection: mongoDB.Collection = db.collection(`${process.env.COLLECTION_NAME}`);

  collections.users = usersCollection;
  

  const id = req?.params?.id;

  try {
    const updatedGame = req.body;
    const query = { _id: new ObjectId(id) };
  
    const result = await collections.users.updateOne(query, { $set: updatedGame });

    result
        ? res.status(200).send(`Successfully updated user with id ${id}`)
        : res.status(304).send(`User with id: ${id} not updated`);
} catch (error) {
    console.error(error);
    res.status(400).send(error);
}
}