const axios = require('axios')
require('dotenv').config()


module.exports.generateTextService = async function (prompt) {
  const url = 'https://api.openai.com/v1/completions'
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }
  const data = {
    model: 'gpt-3.5-turbo',
    prompt: prompt,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 0.7
  }

  try {
    const response = await axios.post(url, data, { headers: headers })
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
  const url = 'https://api.openai.com/v1/models'
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  const headers = {
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }

  try {
    const response = await axios.get(url, { headers: headers })
    console.log('Available models:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching models:', error.response ? error.response.data : error.message)
    throw error
  }
}
