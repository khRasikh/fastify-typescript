"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
async function route(app, opts, next) {
    app.get("/api/users", async (_req, res) => {
        try {
            const users = await DB_1.collections.users?.find({});
            res.status(200).send(users);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
    next();
}
exports.default = route;
