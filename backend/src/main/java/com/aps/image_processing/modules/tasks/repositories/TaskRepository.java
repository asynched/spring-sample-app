package com.aps.image_processing.modules.tasks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aps.image_processing.modules.tasks.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
}
