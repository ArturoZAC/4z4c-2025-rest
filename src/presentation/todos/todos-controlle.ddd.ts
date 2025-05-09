import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {

  //*DI
  constructor(
    private readonly todoRepository: TodoRepository
  ){}

  public getTodos = async( req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  }

  public getTodo = async( req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const todo = await this.todoRepository.findById(id);
      return res.json(todo);
    } catch (error: any) {
      return res.status(500).json({error: error.message});
    }
  }

  public createTodo = async(req: Request, res: Response) => {
    const [ error, createTodoDto ] = CreateTodoDto.create(req.body);
    if( error ) return res.status(400).json({ error });
    const todo = await this.todoRepository.create(createTodoDto!);
    return res.status(201).json(todo);
  }

  public updatedTodo = async(req: Request, res: Response) => {
    const id = +req.params.id;
    const [ error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id})
    if( error ) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.updateById( updateTodoDto! );

    return res.status(200).json(updatedTodo);
  }

  public deleteTodo = async(req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const deletedTodo = await this.todoRepository.deletedById(id);
      return res.status(200).json(deletedTodo)
    } catch (error: any) {
      return res.status(500).json({error: error.message});
    }
  }
}