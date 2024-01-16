import { Configuration, OpenAIApi } from 'openai'

// OpenAI APIのクライアントを作成
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
export const openai = new OpenAIApi(configuration)
