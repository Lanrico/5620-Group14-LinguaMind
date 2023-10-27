import axios from "axios";
const client = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-type": "application/json",
    },
    timeout: 1000 * 60 * 5,
});

class AdminUserService {
    async findByEmail(email) {
        return await client.get(`/users/findByEmail/${email}`);
    }
    async updateUser(user) {
        return await client.put(`/users/update/${user.email}`, user);
    }
}

export default new AdminUserService();