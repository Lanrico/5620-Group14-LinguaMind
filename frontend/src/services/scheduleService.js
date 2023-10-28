import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 1000 * 60 * 5,
});

class ScheduleService {
  async generateSchedule(email, message) {
    const requestBody = {
      choice: "SCHEDULE_GENERATOR",
      message: message
    };
    return await client.post(`/askGPT?email=${email}`, requestBody);
  }

  async getScheduleByEmail(email, message) {
    return await client.get(`/schedule/user/${email}`);
  }
}

export default new ScheduleService();