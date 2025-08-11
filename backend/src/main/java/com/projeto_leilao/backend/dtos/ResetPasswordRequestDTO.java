package com.projeto_leilao.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ResetPasswordRequestDTO {
    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "Formato de e-mail inválido")
    private String email;

    @NotBlank(message = "O código é obrigatório")
    private String codigo;

    @NotBlank(message = "A nova senha é obrigatória")
    private String novaSenha;
}