package com.projeto_leilao.backend.repositories;

import com.projeto_leilao.backend.entities.Lance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanceRepository extends JpaRepository<Lance, Long> {
}