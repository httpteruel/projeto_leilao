package com.projeto_leilao.backend.utils;

import org.springframework.stereotype.Component;

@Component
public class PasswordUtil {

    // APENAS PARA FINS DE DEMONSTRAÇÃO.
    // EM PRODUÇÃO, VOCÊ DEVE USAR UM CRIPTOGRAFA DE SENHAS SEGURO COMO BCryptPasswordEncoder DO SPRING SECURITY.
    public String hashPassword(String rawPassword) {
        return "{noop}" + rawPassword; // '{noop}' é para permitir testes sem criptografia real com Spring Security
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return encodedPassword.equals("{noop}" + rawPassword);
    }
}