package com.seiferson.crabmads.repository;

import com.seiferson.crabmads.model.Article;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface ArticleRepository extends ReactiveMongoRepository<Article, String> {

}
