package com.projeto_leilao.backend.services;

import com.projeto_leilao.backend.dtos.LoginRequestDTO;
import com.projeto_leilao.backend.dtos.RegisterRequestDTO;
import com.projeto_leilao.backend.dtos.ResetPasswordRequestDTO;
import com.projeto_leilao.backend.entities.Usuario;
import com.projeto_leilao.backend.exceptions.ResourceNotFoundException;
import com.projeto_leilao.backend.exceptions.ValidationException;
import com.projeto_leilao.backend.repositories.UsuarioRepository;
import com.projeto_leilao.backend.utils.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordValidationService passwordValidationService;

    @Autowired
    private PasswordUtil passwordUtil;

    public Usuario login(LoginRequestDTO loginRequest) {
        Optional<Usuario> optionalUser = usuarioRepository.findByEmail(loginRequest.getEmail());

        if (optionalUser.isEmpty()) {
            throw new ValidationException("E-mail ou senha inválidos.");
        }

        Usuario usuario = optionalUser.get();

        if (!passwordUtil.checkPassword(loginRequest.getSenha(), usuario.getSenha())) {
            throw new ValidationException("E-mail ou senha inválidos.");
        }

        return usuario;
    }

    public Usuario register(RegisterRequestDTO registerRequest) {
        passwordValidationService.validatePassword(registerRequest.getSenha());

        if (usuarioRepository.existsByEmail(registerRequest.getEmail())) {
            throw new ValidationException("O e-mail já está cadastrado.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(registerRequest.getNome());
        novoUsuario.setEmail(registerRequest.getEmail());
        novoUsuario.setSenha(passwordUtil.hashPassword(registerRequest.getSenha()));

        return usuarioRepository.save(novoUsuario);
    }

    public void recoverPassword(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com o e-mail fornecido."));

        String recoveryCode = generateUniqueRecoveryCode();
        System.out.println("E-mail de recuperação de senha enviado para: " + email + " com código: " + recoveryCode);
    }

    public void resetPassword(ResetPasswordRequestDTO resetRequest) {
        Usuario usuario = usuarioRepository.findByEmail(resetRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com o e-mail fornecido."));

        // Em um sistema real, você validaria o código recebido aqui
        // if (!resetRequest.getCodigo().equals(usuario.getRecoveryCode()) || usuario.getRecoveryCodeExpiry().isBefore(LocalDateTime.now())) {
        //     throw new ValidationException("Código de recuperação inválido ou expirado.");
        // }

        passwordValidationService.validatePassword(resetRequest.getNovaSenha());

        usuario.setSenha(passwordUtil.hashPassword(resetRequest.getNovaSenha()));
        // Invalidate the recovery code
        // usuario.setRecoveryCode(null);
        // usuario.setRecoveryCodeExpiry(null);

        usuarioRepository.save(usuario);
    }

    private String generateUniqueRecoveryCode() {
        return "CODE" + (int) (Math.random() * 9000 + 1000);
    }
}