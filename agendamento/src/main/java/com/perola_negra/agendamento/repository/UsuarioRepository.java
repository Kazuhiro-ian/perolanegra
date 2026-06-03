package com.perola_negra.agendamento.repository;

import com.perola_negra.agendamento.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByTelefone(String telefone);

    Optional<Usuario> findByEmail(String email);
}