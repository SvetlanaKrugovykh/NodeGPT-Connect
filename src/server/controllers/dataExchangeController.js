const path = require('path')
const openAiServcie = require('../services/openaiService')
require('dotenv').config()

const TEMP_CATALOG = process.env.TEMP_CATALOG || path.join(__dirname, '..', '..', 'temp')

module.exports.generateText = async function (request, reply) {
  const { prompt } = request.body
  if (!prompt) {
    reply.status(400).send({ error: 'Prompt is required' })
    return
  }

  try {
    const text = await openAiServcie.generateTextService(prompt)
    reply.send({ text })
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500
    const errorMessage = error.response && error.response.data ? error.response.data.error : 'Failed to generate text due to an internal error'
    reply.status(statusCode).send({ error: errorMessage })
  }
}

module.exports.getAvailableModels = async function (_request, reply) {
  try {
    const text = await openAiServcie.getAvailableModels()
    reply.send({ text })
  } catch (error) {
    reply.status(500).send({ error: 'Failed to generate text' })
  }
}
