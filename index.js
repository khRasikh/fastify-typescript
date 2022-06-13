"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const userController_1 = __importDefault(require("./practice/controllers/userController"));
const mongodb_1 = __importDefault(require("@fastify/mongodb"));
const DB_1 = require("./DB");
const routes_1 = __importDefault(require("./nodb-api/routes"));
const app = (0, fastify_1.default)({ logger: false });
app.register(mongodb_1.default, {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: 'mongodb://localhost:27017/vertrical'
});
app.post("/users", userController_1.default);
app.put("/users", userController_1.default);
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
app.patch("/users", userController_1.default);
app.get("/users", DB_1.connectToDatabase);
// app.get<{Querystring: IBody, Headers: IHeaders, 
//     Reply: IReply}>("/users", connectToDatabase)    
/**End */
app.register(routes_1.default);
/**Start MongoDB */
/**End MongoDB */
app.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
