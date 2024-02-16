import { Request, Response } from 'express';
import statusCode from '../utils/statusCode';
import TaskService from '../services/tasks.service';

export default class TaskController {
  constructor(private taskService = new TaskService()) {}
  
  public async createTask(req: Request, res: Response) {
    const { title, status, priority } = req.body;
    const taskData = { title, status, priority };

    const newTask = await this.taskService.createTask(taskData);

    if (newTask) {
      return res.status(statusCode.CREATED).json(newTask);
    } else {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao adicionar tarefa' });
    }
  }
}