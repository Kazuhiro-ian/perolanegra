package com.perola_negra.agendamento.model;

import jakarta.persistence.*;
import com.perola_negra.agendamento.enums.PerfilUsuario;


@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String telefone;

    @Column(unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PerfilUsuario perfil;

    public Usuario() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public PerfilUsuario getPerfil() { return perfil; }
    public void setPerfil(PerfilUsuario perfil) { this.perfil = perfil; }
}