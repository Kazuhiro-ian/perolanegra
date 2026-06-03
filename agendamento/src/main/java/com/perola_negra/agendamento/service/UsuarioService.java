package com.perola_negra.agendamento.service;

import com.perola_negra.agendamento.model.Usuario;
import com.perola_negra.agendamento.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario salvarUsuario(Usuario usuario) {
        if (usuarioRepository.findByTelefone(usuario.getTelefone()).isPresent()) {
            throw new IllegalArgumentException("Já existe um usuário cadastrado com este telefone.");
        }

        if (usuario.getEmail() != null && usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Já existe um usuário cadastrado com este e-mail.");
        }

        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorTelefone(String telefone) {
        return usuarioRepository.findByTelefone(telefone);
    }
}