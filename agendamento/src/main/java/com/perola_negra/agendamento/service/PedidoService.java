package com.perola_negra.agendamento.service;

import com.perola_negra.agendamento.model.Pedido;
import com.perola_negra.agendamento.enums.StatusPedido;
import com.perola_negra.agendamento.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public Pedido criarPedido(Pedido pedido) {
        if (pedido.getDataHoraAgendamento().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("O horário de agendamento não pode ser no passado.");
        }

        pedido.setStatus(StatusPedido.RECEBIDO);
        return pedidoRepository.save(pedido);
    }

    public Pedido atualizarStatus(Long pedidoId, StatusPedido novoStatus) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new IllegalArgumentException("Pedido não encontrado."));

        pedido.setStatus(novoStatus);
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listarPedidosDoDia() {
        LocalDateTime inicioDoDia = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime fimDoDia = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);

        return pedidoRepository.findByDataHoraAgendamentoBetweenOrderByDataHoraAgendamentoAsc(inicioDoDia, fimDoDia);
    }
}