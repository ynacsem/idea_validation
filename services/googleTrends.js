import googleTrends from 'google-trends-api';

export const fetchTrendsData = async (keyword) => {
  try {
    const response = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date('2020-01-01'),
      endTime: new Date(),
    });

    const data = JSON.parse(response);
    return data.default.timelineData;
  } catch (error) {
    console.error('Error fetching Google Trends data:', error);
    return [];
  }
};
