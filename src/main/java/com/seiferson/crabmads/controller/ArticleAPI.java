package com.seiferson.crabmads.controller;

import com.seiferson.crabmads.model.Article;
import com.seiferson.crabmads.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/articles")
public class ArticleAPI {

    @Autowired
    ArticleRepository repo;

    @GetMapping
    public Flux<Article> getArticles() {
        return repo.findAll();
    }

    @PostMapping
    public Mono<Article> createArticle(@AuthenticationPrincipal OAuth2User principal, @RequestBody Article article) {
        article.setAuthor(principal.getAttribute("login"));
        article.setUpdated(new Date());
        article.setCreated(new Date());
        return repo.insert(article);
    }

    @PutMapping
    public Flux<Article> updateArticle(@AuthenticationPrincipal OAuth2User principal, @RequestBody Article article) {
        return repo.saveAll(
                repo.findById(article.getId())
                        .map(base -> {
                            if(base.getAuthor().equals(principal.getAttribute("login"))){
                                base.setContent(article.getContent());
                                base.setUpdated(new Date());
                            }

                            return base;
                        })
                        .flux()
        );
    }

    @GetMapping("/{id}")
    public Mono<Article> getArticle(@PathVariable String id) {
        return repo.findById(id);
    }
}
