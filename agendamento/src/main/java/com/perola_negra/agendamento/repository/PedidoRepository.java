package com.perola_negra.agendamento.repository;

import com.perola_negra.agendamento.model.Pedido;
import com.perola_negra.agendamento.enums.StatusPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    // Ordena pela hora de chegada na mesa para a cozinha saber o que priorizar
    List<Pedido> findByDataHoraAgendamentoBetweenOrderByDataHoraAgendamentoAsc(LocalDateTime inicio, LocalDateTime fim);

    // Busca pedidos por status (Ex: ver tudo que está "EM_PREPARO")
    List<Pedido> findByStatus(StatusPedido status);
}