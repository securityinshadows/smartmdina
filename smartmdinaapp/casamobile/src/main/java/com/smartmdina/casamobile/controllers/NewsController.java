package com.smartmdina.casamobile.controllers;

import com.smartmdina.casamobile.entities.News;
import com.smartmdina.casamobile.services.NewsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // Get all news
    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    // Get news by ID
    @GetMapping("/{id}")
    public Optional<News> getNewsById(@PathVariable Long id) {
        return newsService.getNewsById(id);
    }

    // Create new news
    @PostMapping
    public News createNews(@RequestBody News news) {
        return newsService.createNews(news);
    }

    // Update news by ID
    @PutMapping("/{id}")
    public News updateNews(@PathVariable Long id, @RequestBody News updatedNews) {
        return newsService.updateNews(id, updatedNews);
    }

    // Delete news by ID
    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
    }
}
