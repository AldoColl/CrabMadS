package com.seiferson.crabmads.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    protected SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http.authorizeExchange(
                a -> a
                        .pathMatchers("/auth").authenticated()
                        .pathMatchers(HttpMethod.PATCH, "/api/v1/articles").authenticated()
                        .pathMatchers(HttpMethod.POST, "/api/v1/articles").authenticated()
                        .pathMatchers("/create.html").authenticated()
                        .pathMatchers("/update.html").authenticated()
                        .anyExchange().permitAll()
        ).csrf().disable().oauth2Login();

        return http.build();
    }
}
