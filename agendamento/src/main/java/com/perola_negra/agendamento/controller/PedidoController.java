package com.perola_negra.agendamento.controller;

import com.perola_negra.agendamento.model.Pedido;
import com.perola_negra.agendamento.enums.StatusPedido;
import com.perola_negra.agendamento.service.PedidoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Pedido pedido) {
        try {
            Pedido novoPedido = pedidoService.criarPedido(pedido);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoPedido);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/hoje")
    public ResponseEntity<List<Pedido>> listarPedidosDeHoje() {
        return ResponseEntity.ok(pedidoService.listarPedidosDoDia());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestParam StatusPedido novoStatus) {
        try {
            Pedido pedidoAtualizado = pedidoService.atualizarStatus(id, novoStatus);
            return ResponseEntity.ok(pedidoAtualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}