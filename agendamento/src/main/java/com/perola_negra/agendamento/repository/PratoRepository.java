package com.perola_negra.agendamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.perola_negra.agendamento.model.Prato;
import java.util.List;

@Repository
public interface PratoRepository extends JpaRepository<Prato, Long> {

    //SELECT * FROM pratos WHERE disponivel = true;
    List<Prato> findByDisponivelTrue();

}