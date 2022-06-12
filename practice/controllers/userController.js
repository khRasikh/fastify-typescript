"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function userController(request, reply) {
    const username = request.body;
    console.log(request.body);
    return reply.send({
        code: 200,
        message: "successs",
        body: {
            username,
            // password
        }
    });
}
exports.default = userController;
