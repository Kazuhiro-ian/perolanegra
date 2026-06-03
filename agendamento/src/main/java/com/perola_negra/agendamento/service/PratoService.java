package com.perola_negra.agendamento.service;

import com.perola_negra.agendamento.model.Prato;
import com.perola_negra.agendamento.repository.PratoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PratoService {

    private final PratoRepository pratoRepository;

    public PratoService(PratoRepository pratoRepository) {
        this.pratoRepository = pratoRepository;
    }

    public Prato salvarPrato(Prato prato) {
        if (prato.getPreco() == null || prato.getPreco().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O preço do prato deve ser maior que zero.");
        }
        return pratoRepository.save(prato);
    }

    public List<Prato> listarTodos() {
        return pratoRepository.findAll();
    }

    public List<Prato> listarDisponiveis() {
        return pratoRepository.findByDisponivelTrue();
    }

    public Optional<Prato> buscarPorId(Long id) {
        return pratoRepository.findById(id);
    }
}