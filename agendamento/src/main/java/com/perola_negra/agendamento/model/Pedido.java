package com.perola_negra.agendamento.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.perola_negra.agendamento.enums.StatusPedido;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "prato_id", nullable = false)
    private Prato prato;

    @Column(nullable = false)
    private LocalDateTime dataHoraAgendamento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusPedido status = StatusPedido.RECEBIDO;

    private String observacao;

    public Pedido() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Prato getPrato() { return prato; }
    public void setPrato(Prato prato) { this.prato = prato; }

    public LocalDateTime getDataHoraAgendamento() { return dataHoraAgendamento; }
    public void setDataHoraAgendamento(LocalDateTime dataHoraAgendamento) { this.dataHoraAgendamento = dataHoraAgendamento; }

    public StatusPedido getStatus() { return status; }
    public void setStatus(StatusPedido status) { this.status = status; }

    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }
}