import axios from "axios";
const client = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-type": "application/json",
    },
    timeout: 1000 * 60 * 5,
});

class VersionService {
    async showAll() {
        return await client.get(`/versions/showAll`);
    }
    async create(version) {
        return await client.post(`/versions/create`, version);
    }
}

export default new VersionService();