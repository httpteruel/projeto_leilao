import api from "../configs/axiosConfig"; // Importe a instância do axios configurada

class AutenticationService {
    // Não é necessário estender BaseService se os endpoints são específicos.
    // É mais simples e direto criar o serviço assim.
    constructor() {
        this.endpoint = "/autenticacao"; // Endpoint de autenticação no backend
    }

    async login(dados) {
        try {
            // A chamada post precisa do endpoint e dos dados
            const resposta = await api.post(`${this.endpoint}/login`, dados);

            // Se o login for bem-sucedido, o backend deve retornar um token
            const { token, user } = resposta.data;

            // Salve o token no localStorage
            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            }
            return resposta.data;
        } catch (error) {
            console.error("Erro no serviço de autenticação:", error);
            throw error;
        }
    }

    async register(dados) {
        try {
            const resposta = await api.post(`${this.endpoint}/register`, dados);
            return resposta.data;
        } catch (error) {
            console.error("Erro no registro:", error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Opcional: Redirecionar para a página de login
        // window.location.href = "/login";
    }

    isLoggedIn() {
        return !!localStorage.getItem("token");
    }

    getToken() {
        return localStorage.getItem("token");
    }

    getUser() {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
}

// Crie uma única instância do serviço e a exporte
const autenticationService = new AutenticationService();
export default autenticationService;