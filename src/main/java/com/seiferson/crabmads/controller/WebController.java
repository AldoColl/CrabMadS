package com.seiferson.crabmads.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import reactor.core.publisher.Mono;

import java.net.URI;

@Controller
public class WebController {

    @GetMapping("/auth")
    @ResponseBody
    public Mono<Void> auth(@AuthenticationPrincipal OAuth2User principal, ServerHttpResponse response){
        response.setStatusCode(HttpStatus.PERMANENT_REDIRECT);
        response.getHeaders().setLocation(URI.create("/?auth="+principal.getAttribute("login")));
        return response.setComplete();
    }

    @GetMapping("/create")
    public Mono<String> createArticle() {
        return Mono.just("create");
    }
}
