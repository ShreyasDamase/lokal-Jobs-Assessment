import { BASE_URL } from "../config";

import axios from "axios";
export const fetchJobs = async (page = 1) => {
  try {
    console.log("inside api call");
    const response = await axios.get(`${BASE_URL}/common/jobs?page=${page}`);
    return {
      jobs: response.data.results.filter((job: any) => job.type === 1009),
      hasMore: response.data.results.length > 0,
      page,
    };
  } catch (error) {
    throw error;
  }
};
