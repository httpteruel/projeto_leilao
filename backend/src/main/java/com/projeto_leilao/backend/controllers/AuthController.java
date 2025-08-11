package com.projeto_leilao.backend.controllers;

import com.projeto_leilao.backend.dtos.ApiResponseDTO;
import com.projeto_leilao.backend.dtos.ForgotPasswordRequestDTO;
import com.projeto_leilao.backend.dtos.LoginRequestDTO;
import com.projeto_leilao.backend.dtos.RegisterRequestDTO;
import com.projeto_leilao.backend.dtos.ResetPasswordRequestDTO;
import com.projeto_leilao.backend.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        authService.login(loginRequest);
        return ResponseEntity.ok(new ApiResponseDTO("Login realizado com sucesso!", true));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDTO> register(@Valid @RequestBody RegisterRequestDTO registerRequest) {
        authService.register(registerRequest);
        return new ResponseEntity<>(new ApiResponseDTO("Usuário registrado com sucesso!", true), HttpStatus.CREATED);
    }

    @PostMapping("/recover-password")
    public ResponseEntity<ApiResponseDTO> recoverPassword(@Valid @RequestBody ForgotPasswordRequestDTO forgotPasswordRequest) {
        authService.recoverPassword(forgotPasswordRequest.getEmail());
        return ResponseEntity.ok(new ApiResponseDTO("Se um e-mail válido for fornecido, um link de recuperação será enviado.", true));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponseDTO> resetPassword(@Valid @RequestBody ResetPasswordRequestDTO resetPasswordRequest) {
        authService.resetPassword(resetPasswordRequest);
        return ResponseEntity.ok(new ApiResponseDTO("Senha alterada com sucesso!", true));
    }
}