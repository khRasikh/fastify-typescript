"use strict";
async function indexController(request, reply) {
    return { statusCode: 200, message: "Success" };
}
module.exports = { indexController };
