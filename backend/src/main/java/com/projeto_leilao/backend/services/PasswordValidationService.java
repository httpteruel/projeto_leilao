package com.projeto_leilao.backend.services;

import com.projeto_leilao.backend.exceptions.ValidationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class PasswordValidationService {

    private static final int MIN_LENGTH = 6;
    private static final Pattern UPPERCASE_PATTERN = Pattern.compile(".*[A-Z].*");
    private static final Pattern LOWERCASE_PATTERN = Pattern.compile(".*[a-z].*");
    private static final Pattern NUMBER_PATTERN = Pattern.compile(".*[0-9].*");
    private static final Pattern SPECIAL_CHAR_PATTERN = Pattern.compile(".*[!@#$%^&*(),.?\":{}|<>\\[\\]\\\\\\-_+=].*");

    public void validatePassword(String password) {
        List<String> errors = new ArrayList<>();

        if (password == null || password.length() < MIN_LENGTH) {
            errors.add("A senha deve ter no mínimo " + MIN_LENGTH + " caracteres.");
        }
        if (!UPPERCASE_PATTERN.matcher(password).matches()) {
            errors.add("A senha deve conter pelo menos 1 letra maiúscula.");
        }
        if (!LOWERCASE_PATTERN.matcher(password).matches()) {
            errors.add("A senha deve conter pelo menos 1 letra minúscula.");
        }
        if (!NUMBER_PATTERN.matcher(password).matches()) {
            errors.add("A senha deve conter pelo menos 1 número.");
        }
        if (!SPECIAL_CHAR_PATTERN.matcher(password).matches()) {
            errors.add("A senha deve conter pelo menos 1 caractere especial (@#$% etc.).");
        }

        if (!errors.isEmpty()) {
            throw new ValidationException("Erro de validação de senha.", errors);
        }
    }
}