package com.projeto_leilao.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_lances")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "O valor do lance é obrigatório")
    @Positive(message = "O valor do lance deve ser positivo")
    private Float valor;

    private LocalDateTime dataLance;

    @ManyToOne
    @JoinColumn(name = "ofertante_id", nullable = false)
    @NotNull(message = "O ofertante do lance é obrigatório")
    private Usuario ofertante;

    @ManyToOne
    @JoinColumn(name = "leilao_id", nullable = false)
    @NotNull(message = "O leilão do lance é obrigatório")
    private Leilao leilao;

    @PrePersist
    public void prePersist() {
        if (dataLance == null) {
            dataLance = LocalDateTime.now();
        }
    }
}