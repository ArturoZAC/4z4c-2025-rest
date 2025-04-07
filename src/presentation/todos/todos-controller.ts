import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeletedTodo, GetAllTodo, GetOneTodo, TodoRepository, UpdatedTodo } from "../../domain";

export class TodosController {

  //*DI
  constructor(
    private readonly todoRepository: TodoRepository
  ){}

  public getTodos = ( req: Request, res: Response) => {
    new GetAllTodo( this.todoRepository )
      .execute()
      .then( todos => res.json(todos))
      .catch( error => res.status(400).json({error}))
  }

  public getTodo = ( req: Request, res: Response) => {
    const id = +req.params.id;
    // try {
    //   const todo = await this.todoRepository.findById(id);
    //   return res.json(todo);
    // } catch (error: any) {
    //   return res.status(500).json({error: error.message});
    // }
    new GetOneTodo( this.todoRepository )
      .execute( id )
      .then( todo => res.json(todo))
      .catch( error => res.status(400).json({error}))
  }

  public createTodo = (req: Request, res: Response) => {
    const [ error, createTodoDto ] = CreateTodoDto.create(req.body);
    if( error ) return res.status(400).json({ error });
    // const todo = await this.todoRepository.create(createTodoDto!);
    // return res.status(201).json(todo);
    new CreateTodo( this.todoRepository )
      .execute( createTodoDto! )
      .then( todo => res.json(todo))
      .catch( error => res.status(400).json({error}))
  }

  public updatedTodo = async(req: Request, res: Response) => {
    const id = +req.params.id;
    const [ error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id})
    if( error ) return res.status(400).json({ error });

    // const updatedTodo = await this.todoRepository.updateById( updateTodoDto! );
    // return res.status(200).json(updatedTodo);
    new UpdatedTodo( this.todoRepository )
      .execute( updateTodoDto! )
      .then( todo => res.json( todo ))
      .catch( error => res.status(400).json({error}))
  }

  public deleteTodo = async(req: Request, res: Response) => {
    const id = +req.params.id;
    // try {
    //   const deletedTodo = await this.todoRepository.deletedById(id);
    //   return res.status(200).json(deletedTodo)
    // } catch (error: any) {
    //   return res.status(500).json({error: error.message});
    // }
    new DeletedTodo( this.todoRepository )
      .execute( id )
      .then( todo => res.json(todo))
      .catch( error => res.status(400).json({error}))
  }
}