import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(title: string, description?: string): Promise<Task> {
    const task = this.taskRepository.create({ title, description });
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`); // Throw exception if task not found
    }
    return task;
  }

  async update(id: string, title?: string, description?: string, status?: TaskStatus): Promise<Task> {
    await this.taskRepository.update(id, { title, description, status });
    const updatedTask = await this.findOne(id); // Re-fetch the task after update
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found after update`); // Handle case where task might not be found after update (unlikely, but good to handle)
    }
    return updatedTask; 
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
