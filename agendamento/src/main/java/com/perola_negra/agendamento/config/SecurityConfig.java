package com.perola_negra.agendamento.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Desabilita o CSRF (necessário para APIs REST e comunicação com React)
                .csrf(csrf -> csrf.disable())

                // 2. Habilita o CORS para que ele respeite o seu WebConfig.java
                .cors(Customizer.withDefaults())

                // 3. Libera o acesso a todas as rotas (sem pedir senha)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}