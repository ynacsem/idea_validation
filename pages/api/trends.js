// pages/api/trends.js
const googleTrends = require('google-trends-api');

export default async function handler(req, res) {
  const { keyword } = req.query;

  try {
    console.log(keyword);
    const trendsData = await googleTrends.interestOverTime({ keyword });
    res.status(200).json(JSON.parse(trendsData));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
