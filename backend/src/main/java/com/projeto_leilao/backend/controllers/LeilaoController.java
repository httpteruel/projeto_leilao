package com.projeto_leilao.backend.controllers;

import com.projeto_leilao.backend.entities.Leilao;
import com.projeto_leilao.backend.services.LeilaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leiloes")
public class LeilaoController {

    @Autowired
    private LeilaoService leilaoService;

    @GetMapping
    public ResponseEntity<List<Leilao>> getAllLeiloes() {
        List<Leilao> leiloes = leilaoService.findAllLeiloes();
        return ResponseEntity.ok(leiloes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Leilao> getLeilaoById(@PathVariable Long id) {
        Leilao leilao = leilaoService.findLeilaoById(id);
        return ResponseEntity.ok(leilao);
    }

    @PostMapping
    public ResponseEntity<Leilao> createLeilao(@Valid @RequestBody Leilao leilao) {
        Leilao novoLeilao = leilaoService.createLeilao(leilao);
        return new ResponseEntity<>(novoLeilao, HttpStatus.CREATED);
    }
}