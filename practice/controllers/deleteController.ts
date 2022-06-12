export default async function userController(request: { body: any; }, reply: any) {
    const username:any= request.body; 
    console.log(request.body)
    return reply.send({
      code: 200,
      message: "successs", 
      body: {
        username,
        // password
      }
    })
  }