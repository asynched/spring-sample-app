package com.aps.image_processing.modules.tasks.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.aps.image_processing.modules.tasks.entities.Task;
import com.aps.image_processing.modules.tasks.repositories.TaskRepository;

@Service
public class TaskService {
  @Autowired
  private TaskRepository taskRepository;

  public Page<Task> getAll(Pageable pageable) {
    return taskRepository.findAll(pageable);
  }

  public Optional<Task> findTaskById(int id) {
    return taskRepository.findById(id);
  }

  public Optional<Task> getTask(int id) {
    return taskRepository.findById(id);
  }

  public Task createTask(Task task) {
    return taskRepository.save(task);
  }

  public void deleteTask(int taskId) {
    taskRepository.deleteById(taskId);
  }
}
