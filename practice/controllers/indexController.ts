interface requestData  {
  request: any
}
interface replyData {
  message: string,
  statusCode: number
}
async function indexController(request: requestData, reply: replyData) {
  return { statusCode: 200, message: "Success" };
}

module.exports = { indexController };
