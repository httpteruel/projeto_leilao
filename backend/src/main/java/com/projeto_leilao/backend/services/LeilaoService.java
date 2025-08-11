package com.projeto_leilao.backend.services;

import com.projeto_leilao.backend.entities.Leilao;
import com.projeto_leilao.backend.exceptions.ResourceNotFoundException;
import com.projeto_leilao.backend.repositories.LeilaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeilaoService {

    @Autowired
    private LeilaoRepository leilaoRepository;

    public List<Leilao> findAllLeiloes() {
        return leilaoRepository.findAll();
    }

    public Leilao findLeilaoById(Long id) {
        return leilaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leilão não encontrado com ID: " + id));
    }

    public Leilao createLeilao(Leilao leilao) {
        return leilaoRepository.save(leilao);
    }
}