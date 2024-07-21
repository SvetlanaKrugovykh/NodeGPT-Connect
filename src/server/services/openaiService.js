const { OpenAI } = require('openai')
const axios = require('axios')
require('dotenv').config()


module.exports.generateTextService = async function (prompt) {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    const generatedText = response.data.choices[0].text.trim()
    console.log(generatedText)
    return generatedText
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data)
      console.error('Error response status:', error.response.status)
      console.error('Error response headers:', error.response.headers)
    } else if (error.request) {
      console.error('Error request:', error.request)
    } else {
      console.error('Error message:', error.message)
    }
    console.error('Error config:', error.config)
    throw error
  }
}

module.exports.getAvailableModels = async function () {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  try {
    const response = await openai.models.list()
    console.log('Available models:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching models:', error.response ? error.response.data : error.message)
    throw error
  }
}
