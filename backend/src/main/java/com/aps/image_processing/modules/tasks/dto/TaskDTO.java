package com.aps.image_processing.modules.tasks.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class TaskDTO {
  @NotBlank
  private String title;

  @NotBlank
  private String description;

  private boolean completed = false;
}
