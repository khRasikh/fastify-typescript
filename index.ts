import fastify from 'fastify'
const {indexController} = require("./practice/controllers/indexController")
const server = fastify()

server.get('/', indexController)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})