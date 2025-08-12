import api from "../configs/axiosConfig";

class AutenticationService {
    constructor() {
        this.endpoint = "/autenticacao";
    }

    async login(dados) {
        try {
            const resposta = await api.post(`${this.endpoint}/login`, dados);
            const { token, user } = resposta.data;

            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            }

            return resposta.data;
        } catch (error) {
            console.error("Erro no serviço de login:", error);
            throw error;
        }
    }

    async register(dados) {
        try {
            const resposta = await api.post(`${this.endpoint}/register`, dados);
            return resposta.data;
        } catch (error) {
            console.error("Erro no serviço de registro:", error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    isLoggedIn() {
        return !!localStorage.getItem("token");
    }

    getToken() {
        return localStorage.getItem("token");
    }
}

const autenticationService = new AutenticationService();
export default autenticationService;