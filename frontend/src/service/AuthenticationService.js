import api from "../configs/axiosConfig";

class AuthenticationService {
    constructor() {
        // A URL base do seu backend Spring Boot, conforme a configura\u00E7\u00E3o do seu projeto.
        this.base_url = "http://localhost:8080/api/auth";
    }

    async login(dados) {
        try {
            const resposta = await api.post(`${this.base_url}/login`, dados);
            // Seu backend retorna um ApiResponseDTO com a mensagem de sucesso, mas n\u00E3o um token.
            // Para que o fluxo do frontend funcione, vamos simular o armazenamento de um token.
            localStorage.setItem("token", "dummy-token-para-teste");
            localStorage.setItem("user", JSON.stringify({ email: dados.email }));

            return resposta.data;
        } catch (error) {
            // O seu GlobalExceptionHandler retorna um DTO com a mensagem de erro.
            const mensagemErro = error.response?.data?.message || "Erro desconhecido no login.";
            console.error("Erro no servi\u00E7o de login:", mensagemErro);
            throw new Error(mensagemErro);
        }
    }

    async register(dados) {
        try {
            const resposta = await api.post(`${this.base_url}/register`, dados);
            return resposta.data;
        } catch (error) {
            // O seu GlobalExceptionHandler retorna um DTO com a mensagem de erro.
            const mensagemErro = error.response?.data?.message || "Erro desconhecido no registro.";
            console.error("Erro no servi\u00E7o de registro:", mensagemErro);
            throw new Error(mensagemErro);
        }
    }

    async recoverPassword(email) {
        try {
            const resposta = await api.post(`${this.base_url}/recover-password`, { email });
            return resposta.data;
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro desconhecido na recupera\u00E7\u00E3o.";
            console.error("Erro no servi\u00E7o de recupera\u00E7\u00E3o:", mensagemErro);
            throw new Error(mensagemErro);
        }
    }

    async resetPassword(dados) {
        try {
            const resposta = await api.post(`${this.base_url}/reset-password`, dados);
            return resposta.data;
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro desconhecido na redefini\u00E7\u00E3o.";
            console.error("Erro no servi\u00E7o de redefini\u00E7\u00E3o:", mensagemErro);
            throw new Error(mensagemErro);
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

const authenticationService = new AuthenticationService();
export default authenticationService;
