"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.collections = void 0;
const fastify_1 = __importDefault(require("fastify"));
const userController_1 = __importDefault(require("./practice/controllers/userController"));
const mongodb_1 = __importDefault(require("@fastify/mongodb"));
const app = (0, fastify_1.default)({ logger: false });
app.register(mongodb_1.default, {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: 'mongodb://localhost:27017/vertrical'
});
app.post("/users", userController_1.default);
app.put("/users", userController_1.default);
app.get("/users", async (req, res) => {
    const result = app.mongo.client.db('vertrical').collection('nodb-api-v1');
    console.log(result);
    // Or this.mongo.client.db('mydb').collection('users')
    return {
        code: 200,
        message: "Success",
        body: "any"
    };
});
app.patch("/users", userController_1.default);
app.get("/db", connectToDatabase);
/**End */
/**Start MongoDB */
const mongoDB = __importStar(require("mongodb"));
const dotenv = __importStar(require("dotenv"));
exports.collections = {};
async function connectToDatabase() {
    dotenv.config();
    const client = new mongoDB.MongoClient("mongodb://localhost:27017");
    await client.connect();
    const db = client.db("vertrical");
    const gamesCollection = db.collection("users");
    exports.collections.games = gamesCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
    const games = (await exports.collections.games.find({}).toArray());
    console.log(games);
}
exports.connectToDatabase = connectToDatabase;
/**End MongoDB */
app.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
