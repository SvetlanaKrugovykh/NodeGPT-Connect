const dataExchangeController = require('../controllers/dataExchangeController')
const isAuthorizedGuard = require('../guards/is-authorized.guard')
const openaiSchema = require('../schemas/openaiSchema')
module.exports = (fastify, _opts, done) => {

  fastify.route({
    method: 'POST',
    url: '/generate-text',
    handler: dataExchangeController.generateText,
    preHandler: [
      isAuthorizedGuard
    ],
    schema: openaiSchema
  })

  fastify.route({
    method: 'GET',
    url: '/getAvailableModels',
    handler: dataExchangeController.getAvailableModels,
    preHandler: [
      isAuthorizedGuard
    ],
  })


  done()
}

