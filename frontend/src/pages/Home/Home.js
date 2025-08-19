import React, { useState, useEffect } from 'react';
import authenticationService from '../../service/AuthenticationService';
import api from '../../configs/axiosConfig'; // Certifique-se de que este caminho est\u00E1 correto
import Button from '../../components/Button/Button';
import './Home.css'; // Crie este arquivo se ele n\u00E3o existir

const Home = ({ onNavigate }) => {
    const [message, setMessage] = useState('Verificando token...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const token = authenticationService.getToken();

            if (!token) {
                setMessage('Token n\u00E3o encontrado. Fa\u00E7a o login novamente.');
                setLoading(false);
                return;
            }

            // Exemplo de como anexar o token para cada requisi\u00E7\u00E3o protegida
            // Isso geralmente \u00E9 feito em um interceptor do axios,
            // mas faremos aqui para o teste.
            // O seu c\u00F3digo de api j\u00E1 faz isso, ent\u00E3o n\u00E3o precisa ser feito aqui.
            // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            try {
                // Fazer uma requisi\u00E7\u00E3o a um endpoint protegido do backend
                // Substitua a URL pelo seu endpoint real
                const response = await api.get('/usuarios/perfil'); // Exemplo de endpoint protegido
                setMessage(`Token v\u00E1lido! Bem-vindo, ${response.data.nome}!`);
            } catch (err) {
                console.error('Erro ao verificar o token:', err);
                setMessage('Token inv\u00E1lido. Redirecionando para o login.');
                authenticationService.logout();
                setTimeout(() => onNavigate('login'), 2000);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, [onNavigate]);

    const handleLogout = () => {
        authenticationService.logout();
        onNavigate('login');
    };

    return (
        <div className="home-container">
            <div className="home-card">
                <h1>P\u00E1gina Principal</h1>
                {loading ? <p>Carregando...</p> : <p>{message}</p>}
                <Button onClick={handleLogout}>Sair</Button>
            </div>
        </div>
    );
};

export default Home;
