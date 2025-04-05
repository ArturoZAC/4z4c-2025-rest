import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {

  //*DI
  constructor(){}

  public getTodos = async( req: Request, res: Response) => {

    const todos = await prisma.todo.findMany();
    return res.json(todos);
  }

  public getTodo = async( req: Request, res: Response) => {
    const id = +req.params.id;
    if( isNaN(id) ) return res.status(400).json({ error: 'Id argument is not a number'});

    const todo = await prisma.todo.findUnique({
      where: { id }
    })

    return todo
      ? res.json( todo ) 
      : res.status(404).json({ error: `Todo with id ${id} not found`})
  }

  public createTodo = async(req: Request, res: Response) => {

    const [ error, createTodoDto ] = CreateTodoDto.create(req.body);
    if( error ) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!
    })
    
    res.status(201).json( todo )
  }

  public updatedTodo = async(req: Request, res: Response) => {
    const id = +req.params.id;
    const [ error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id})
    if( error ) return res.status(400).json({ error });

    const todo = await prisma.todo.findUnique({
      where: { id }
    })

    if( !todo ) return res.status(404).json({ error: `Todo with id ${id} not found`});

    const {id: updatedId, ...rest} = updateTodoDto!;

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: rest
    })
    // todo.text = text || todo.text;
    // ( completedAt === 'null' )
    //   ? todo.createdAt = null!
    //   : todo.createdAt = new Date( completedAt || todo.createdAt )

    return res.json(updatedTodo);
  }

  public deleteTodo = async(req: Request, res: Response) => {
    const id = +req.params.id;
    if( isNaN(id) ) return res.status(400).json({ error: 'Id argument is not a number'});
      
    const todo = await prisma.todo.findUnique({
      where: { id }
    })
    if( !todo ) return res.status(404).json({ error: `Todo with id ${id} not found`});

    const deletedTodo = await prisma.todo.delete({
      where: { id }

    })
    
    return ( deletedTodo )
      ? res.status(200).json(deletedTodo)
      : res.status(404).json({ error: `Todo with id ${id} not found`})
  }
}