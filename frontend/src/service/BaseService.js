// backend/src/main/java/com/projetoleilao/backend/services/BaseService.js
import api from "../configs/axiosConfig";

class BaseService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    // Método para inserir um novo recurso
    async inserir(dados) {
        try {
            const resposta = await api.post(this.endpoint, dados);
            return resposta.data;
        } catch (error) {
            console.error(`Erro ao inserir no endpoint ${this.endpoint}:`, error);
            throw error;
        }
    }

    // Método para atualizar um recurso existente
    async alterar(id, dados) {
        try {
            const resposta = await api.put(`${this.endpoint}/${id}`, dados);
            return resposta.data;
        } catch (error) {
            console.error(`Erro ao alterar no endpoint ${this.endpoint}/${id}:`, error);
            throw error;
        }
    }

    // Método para excluir um recurso por ID
    async excluir(id) {
        try {
            const resposta = await api.delete(`${this.endpoint}/${id}`);
            return resposta.data;
        } catch (error) {
            console.error(`Erro ao excluir no endpoint ${this.endpoint}/${id}:`, error);
            throw error;
        }
    }

    // Método para buscar todos os recursos
    async buscarTodos() {
        try {
            const resposta = await api.get(this.endpoint);
            return resposta.data;
        } catch (error) {
            console.error(`Erro ao buscar todos no endpoint ${this.endpoint}:`, error);
            throw error;
        }
    }

    // Método para buscar um recurso por ID
    async buscarPorId(id) {
        try {
            const resposta = await api.get(`${this.endpoint}/${id}`);
            return resposta.data;
        } catch (error) {
            console.error(`Erro ao buscar por ID no endpoint ${this.endpoint}/${id}:`, error);
            throw error;
        }
    }
}

export default BaseService;