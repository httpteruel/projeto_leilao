package com.projeto_leilao.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;


import com.projeto_leilao.backend.entities.Leilao; // classe Leilao
import com.projeto_leilao.backend.entities.Lance; // classe Lance

@Entity
@Table(name = "tb_usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    private String nome;

    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "Formato de e-mail inválido")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    private String senha; // Armazenar o hash da senha

    private LocalDateTime dataCadastro;

    private Boolean ativo;

    @OneToMany(mappedBy = "criador", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Leilao> leiloesCriados;

    @OneToMany(mappedBy = "ofertante", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Lance> lancesFeitos;

    @PrePersist
    public void prePersist() {
        if (dataCadastro == null) {
            dataCadastro = LocalDateTime.now();
        }
        if (ativo == null) {
            ativo = true;
        }
    }
}