package com.projeto_leilao.backend.dtos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponseDTO {
    private String message;
    private boolean success;
    private Object data;

    public ApiResponseDTO(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
}