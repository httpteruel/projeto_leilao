package com.projeto_leilao.backend.controllers;

import com.projeto_leilao.backend.dtos.ApiResponseDTO;
import com.projeto_leilao.backend.exceptions.ResourceNotFoundException;
import com.projeto_leilao.backend.exceptions.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDTO> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());
        return new ResponseEntity<>(new ApiResponseDTO("Erro de validação", false, errors), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponseDTO> handleCustomValidationException(ValidationException ex) {
        if (ex.getErrors() != null && !ex.getErrors().isEmpty()) {
            return new ResponseEntity<>(new ApiResponseDTO(ex.getMessage(), false, ex.getErrors()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponseDTO(ex.getMessage(), false), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponseDTO> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(new ApiResponseDTO(ex.getMessage(), false), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDTO> handleGlobalException(Exception ex) {
        return new ResponseEntity<>(new ApiResponseDTO("Ocorreu um erro inesperado: " + ex.getMessage(), false), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}