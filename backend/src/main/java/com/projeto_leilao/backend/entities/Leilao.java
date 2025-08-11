package com.projeto_leilao.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "tb_leiloes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Leilao {

    public enum StatusLeilao {
        ABERTO, FECHADO, CANCELADO
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do item é obrigatório")
    @Size(min = 3, max = 255, message = "O nome do item deve ter entre 3 e 255 caracteres")
    private String nomeItem;

    @NotBlank(message = "A descrição é obrigatória")
    private String descricao;

    @NotNull(message = "O preço inicial é obrigatório")
    @Positive(message = "O preço inicial deve ser positivo")
    private Float precoInicial;

    @NotNull(message = "A data de início é obrigatória")
    @FutureOrPresent(message = "A data de início não pode ser no passado")
    private LocalDateTime dataInicio;

    @NotNull(message = "A data de fim é obrigatória")
    @FutureOrPresent(message = "A data de fim não pode ser no passado")
    private LocalDateTime dataFim;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "O status do leilão é obrigatório")
    private StatusLeilao status;

    @ManyToOne
    @JoinColumn(name = "criador_id", nullable = false)
    @NotNull(message = "O criador do leilão é obrigatório")
    private Usuario criador;

    @OneToMany(mappedBy = "leilao", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Lance> lances;

    @AssertTrue(message = "A data de fim deve ser posterior à data de início")
    public boolean isDataFimValid() {
        return dataInicio == null || dataFim == null || dataFim.isAfter(dataInicio);
    }

    @PrePersist
    public void prePersist() {
        if (dataInicio == null) {
            dataInicio = LocalDateTime.now();
        }
        if (status == null) {
            status = StatusLeilao.ABERTO;
        }
    }
}