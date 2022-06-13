import { FastifyReply, FastifyRequest } from 'fastify'; 
// import collections from "../DB";
 
import * as mongoDB from "mongodb";
export const collections: { users?: mongoDB.Collection } = {}


async function route(app:any, opts:any, next:any){
    app.get("/api/users", async (_req: FastifyRequest, res: FastifyReply) => {
        // try {
        //    const users = await collections.users?.find({}).toArray(); 
        //     console.log("Users: "+users)
        //     res.status(200).send(users);
        // } catch (error) {
        //     res.status(500).send(error);
        // }
        const users = await collections.users.find({}).toArray(); 
        console.log("Users: "+users)
        res.status(200).send(users);
    //   res.send("HI")
    });

    next(); 
}

export default route; 