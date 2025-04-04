package com.smartmdina.casamobile.services;

import com.smartmdina.casamobile.entities.Job;
import com.smartmdina.casamobile.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job createJob(Job job) {
        job.setCreatedAt(LocalDateTime.now());
        job.setUpdatedAt(LocalDateTime.now());
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    public List<Job> getJobsByStatus(String status) {
        return jobRepository.findByStatus(status);
    }

    public List<Job> searchJobsByTag(String tag) {
        return jobRepository.findByTagsContaining(tag);
    }
}
