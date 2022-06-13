import * as mongoDB from "mongodb";
import { ObjectId } from "mongodb";
import { collections } from "../DB";
import dotenv from 'dotenv'; 
import { FastifyRequest, FastifyReply } from "fastify";
dotenv.config(); 
export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(`${process.env.DB_CONN_STRING}`
  );

  await client.connect();

  const db: mongoDB.Db = client.db(`${process.env.DB_NAME}`);

  const usersCollection: mongoDB.Collection = db.collection(`${process.env.COLLECTION_NAME}`);

  collections.users = usersCollection;
  

  // const id = req?.params?.id;

  try {
    const newUser:any = req.body;
    const result = await collections.users.insertOne(newUser);

    result
        ? reply.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
        : reply.status(500).send("Failed to create a new user.");
} catch (error) {
    console.error(error);
    reply.status(400).send(error);
}
}