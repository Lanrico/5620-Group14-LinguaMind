import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 1000 * 60 * 5,
});

class UserService {
  async showAll() {
    return await client.get(`/users/showAll`);
  }
  async findUserByEmail(email) {
    return await client.get(`/users/findByEmail/${email}`);
  }
  async create(user) {
    return await client.post(`/users/create`, user);
  }
}

export default new UserService();