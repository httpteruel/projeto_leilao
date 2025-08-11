package com.projeto_leilao.backend.repositories; // <-- ATENÇÃO AO PACOTE

import com.projeto_leilao.backend.entities.Leilao; // <-- IMPORTANTE: Importa a Entidade Leilao
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeilaoRepository extends JpaRepository<Leilao, Long> {
    // Pode adicionar métodos customizados aqui se necessário, ex: findByStatus()
}