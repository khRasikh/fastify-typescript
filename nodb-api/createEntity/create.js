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
exports.createUser = void 0;
const mongoDB = __importStar(require("mongodb"));
const DB_1 = require("./../../DB");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function createUser(req, reply) {
    const client = new mongoDB.MongoClient(`${process.env.DB_CONN_STRING}`);
    await client.connect();
    const db = client.db(`${process.env.DB_NAME}`);
    const usersCollection = db.collection(`${process.env.COLLECTION_NAME}`);
    DB_1.collections.users = usersCollection;
    // const id = req?.params?.id;
    try {
        const newUser = req.body;
        const result = await DB_1.collections.users.insertOne(newUser);
        result
            ? reply.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : reply.status(500).send("Failed to create a new user.");
    }
    catch (error) {
        console.error(error);
        reply.status(400).send(error);
    }
}
exports.createUser = createUser;
