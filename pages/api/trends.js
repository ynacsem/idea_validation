import googleTrends from 'google-trends-api';

export default async function handler(req, res) {
  const { keyword } = req.query;

  try {
    // Get the current date and calculate the date 6 months ago
    const endTime = new Date();
    const startTime = new Date();
    startTime.setMonth(endTime.getMonth() - 6);

    // Fetch Google Trends data with monthly resolution
    const response = await googleTrends.interestOverTime({
      keyword,
      startTime,
      endTime,
      granularTimeResolution: false, // This sets the resolution to monthly instead of daily
    });

    const data = JSON.parse(response);

    // Filter the data to return only one value per month
    const timelineData = data.default.timelineData;
    const monthlyData = [];

    for (let i = 0; i < timelineData.length; i++) {
      const formattedTime = new Date(timelineData[i].formattedTime);
      // Get only the first value for each month
      if (i === 0 || formattedTime.getMonth() !== new Date(timelineData[i - 1].formattedTime).getMonth()) {
        monthlyData.push(timelineData[i]);
      }
    }

    res.status(200).json(monthlyData);
  } catch (error) {
    console.error('Error fetching Google Trends data:', error);
    res.status(500).json({ error: 'Failed to fetch Google Trends data' });
  }
}
