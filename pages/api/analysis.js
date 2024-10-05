// pages/api/analysis.js
import axios from 'axios';

export default async function handler(req, res) {
  const { trendsData } = req.body;

  try {
    const geminiResponse = await axios.post('https://gemini-api-endpoint', {
      input: trendsData,
    });
    res.status(200).json(geminiResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
