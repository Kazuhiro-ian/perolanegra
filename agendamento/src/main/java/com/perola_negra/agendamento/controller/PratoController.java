package com.perola_negra.agendamento.controller;

import com.perola_negra.agendamento.model.Prato;
import com.perola_negra.agendamento.service.PratoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pratos")
public class PratoController {

    private final PratoService pratoService;

    public PratoController(PratoService pratoService) {
        this.pratoService = pratoService;
    }

    @PostMapping
    public ResponseEntity<Prato> cadastrar(@RequestBody Prato prato) {
        try {
            Prato pratoSalvo = pratoService.salvarPrato(prato);
            return ResponseEntity.status(HttpStatus.CREATED).body(pratoSalvo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<List<Prato>> listarDisponiveis() {
        List<Prato> pratos = pratoService.listarDisponiveis();
        return ResponseEntity.ok(pratos);
    }

    @GetMapping
    public ResponseEntity<List<Prato>> listarTodos() {
        return ResponseEntity.ok(pratoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prato> buscarPorId(@PathVariable Long id) {
        Optional<Prato> prato = pratoService.buscarPorId(id);
        return prato.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}