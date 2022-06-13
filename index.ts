import fastify, { FastifyInstance } from 'fastify'; 
import userController from './practice/controllers/userController'
import DBConnection from '@fastify/mongodb'
import {connectToDatabase} from './DB'
import nodbRoutes from './nodb-api/routes'
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

// app.get<{Querystring: IQueryInterface, Headers: IHeaders, 
// Reply: IReply}>("/users", async(req, res)=>{
//   const result = app.mongo.client.db('vertrical').collection('nodb-api-v1');
//   console.log(result);   
//   // Or this.mongo.client.db('mydb').collection('users')

//   return {
//     code: 200 ,
//     message: "Success",
//     body: "any" }
// })


app.patch<{Querystring: IQueryInterface, Headers: IHeaders, 
Reply: IReply}>("/users", userController)    

interface IBody {
  name: string, 
  age: number, 
  status: boolean, 
  doneAt: string, 
  levels: any, 
  classes: any, 
}
app.get<{Querystring: IBody, Headers: IHeaders, 
  Reply: IReply}>("/users", connectToDatabase)    

// app.get<{Querystring: IBody, Headers: IHeaders, 
//     Reply: IReply}>("/users", connectToDatabase)    
/**End */
app.register(nodbRoutes)
/**Start MongoDB */ 

 
/**End MongoDB */
app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})