"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collections = void 0;
exports.collections = {};
async function route(app, opts, next) {
    app.get("/api/users", async (_req, res) => {
        // try {
        //    const users = await collections.users?.find({}).toArray(); 
        //     console.log("Users: "+users)
        //     res.status(200).send(users);
        // } catch (error) {
        //     res.status(500).send(error);
        // }
        const users = await exports.collections.users?.find({}).toArray();
        console.log("Users: " + users);
        res.status(200).send(users);
        //   res.send("HI")
    });
    next();
}
exports.default = route;
