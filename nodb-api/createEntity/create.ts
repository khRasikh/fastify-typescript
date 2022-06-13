import { FastifyReply, FastifyRequest } from 'fastify'; 
import { collections } from "../../DB";
import users from "../model/Users";

async function route(app:any, opts:any, next:any){
    app.get("/api/users", async (_req: FastifyRequest, res: FastifyReply) => {
        try {
           const users = await collections.users?.find({})
    
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send(error);
        }
      
    });

    next(); 
}

export default route; 