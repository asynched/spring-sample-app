package com.aps.image_processing.modules.tasks.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.aps.image_processing.modules.tasks.dto.TaskDTO;
import com.aps.image_processing.modules.tasks.entities.Task;
import com.aps.image_processing.modules.tasks.services.TaskService;

@RestController
@CrossOrigin("*")
@RequestMapping("/tasks")
public class TaskController {
  @Autowired
  private TaskService taskService;

  @GetMapping
  public ResponseEntity<Page<Task>> listTasks(
      @PageableDefault(page = 0, size = 100, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
    return ResponseEntity.status(HttpStatus.OK).body(taskService.getAll(pageable));
  }

  @PostMapping
  public ResponseEntity<Task> createTask(@RequestBody @Valid TaskDTO taskDTO) {
    var task = new Task();

    BeanUtils.copyProperties(taskDTO, task);

    return ResponseEntity.ok(taskService.createTask(task));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> getTask(@PathVariable Integer id) {
    var task = taskService.getTask(id);

    if (task.isPresent()) {
      return ResponseEntity.ok(task.get());
    }

    return ResponseEntity.notFound().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteTask(@PathVariable @Valid Integer id) {
    var task = taskService.findTaskById(id);

    if (task.isPresent()) {
      taskService.deleteTask(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Task> updateTask(@PathVariable Integer id, @RequestBody @Valid TaskDTO taskDTO) {
    var taskOption = taskService.findTaskById(id);

    if (taskOption.isPresent()) {
      var task = taskOption.get();
      BeanUtils.copyProperties(taskDTO, task, "id");
      return ResponseEntity.ok(taskService.createTask(task));
    }

    return ResponseEntity.notFound().build();
  }
}
