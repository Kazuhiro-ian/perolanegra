package com.perola_negra.agendamento.controller;

import com.perola_negra.agendamento.model.Usuario;
import com.perola_negra.agendamento.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        try {
            Usuario usuarioSalvo = usuarioService.salvarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(id);
        return usuario.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/telefone/{telefone}")
    public ResponseEntity<Usuario> buscarPorTelefone(@PathVariable String telefone) {
        Optional<Usuario> usuario = usuarioService.buscarPorTelefone(telefone);
        return usuario.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}