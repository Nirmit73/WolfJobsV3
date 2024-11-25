

import axios from 'axios';

interface GetJobKeywordsResponse {
  success: boolean;
  keywords: string[];
}

const API_BASE_URL = 'http://localhost:8000'; // Adjust to match your backend URL

export const getJobKeywords = async (
  jobId: string
): Promise<GetJobKeywordsResponse> => {
  try {
    console.log('Making request to get job keywords for jobId:', jobId);
    const response = await axios.get<GetJobKeywordsResponse>(
      `${API_BASE_URL}/api/v1/job/getJobKeywords/${jobId}`
    );
    console.log('Received response from API:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching job keywords:', error);
    throw error;
  }
};
