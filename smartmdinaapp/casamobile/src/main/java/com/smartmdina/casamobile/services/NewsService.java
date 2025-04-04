package com.smartmdina.casamobile.services;

import com.smartmdina.casamobile.entities.News;
import com.smartmdina.casamobile.repositories.NewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    // Retrieve all news
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    // Retrieve news by ID
    public Optional<News> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    // Create a new news entry
    public News createNews(News news) {
        return newsRepository.save(news);
    }

    // Update an existing news entry
    public News updateNews(Long id, News updatedNews) {
        // Check if the news entry exists before updating
        return newsRepository.findById(id)
                .map(existingNews -> {
                    existingNews.setTitle(updatedNews.getTitle());
                    existingNews.setImage(updatedNews.getImage());
                    existingNews.setBody(updatedNews.getBody());
                    existingNews.setAuthor(updatedNews.getAuthor());
                    existingNews.setDate(updatedNews.getDate());
                    existingNews.setTags(updatedNews.getTags());
                    existingNews.setStatus(updatedNews.getStatus());
                    existingNews.setDescription(updatedNews.getDescription());
                    return newsRepository.save(existingNews);
                })
                .orElseThrow(() -> new RuntimeException("News not found"));
    }

    // Delete news by ID
    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }
}
