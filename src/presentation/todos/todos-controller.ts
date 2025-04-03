import { Request, Response } from "express";
import { z } from "zod";

const todos = [
  { id: 1, text: 'Buy Chocolate', completedAt: new Date()},
  { id: 2, text: 'Buy Watch', completedAt: new Date()}
]

export class TodosController {

  //*DI
  constructor(){}

  public getTodos = ( req: Request, res: Response) => {
    return res.json(todos);
  }

  public getTodo = ( req: Request, res: Response) => {
    const id = +req.params.id;
    if( isNaN(id) ) return res.status(400).json({ error: 'Id argument is not a number'});
    const todo = todos.find( (todo) => todo.id === id)

    return todo
      ? res.json( todo ) 
      : res.status(404).json({ error: `Todo with id ${id} not found`})
  }

  public createTodo = (req: Request, res: Response) => {
    const bodySchema = z.object({
      text: z.string().min(1)
    })

    const result = bodySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.issues[0].message
      });
    }

    const { text }: z.infer<typeof bodySchema> = req.body;
    const newTodo = {
      id: todos.length + 1,
      completedAt: new Date(),
      text: text
    }

    todos.push( newTodo )

    res.status(201).json( newTodo )

  }

  public updatedTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if( isNaN(id) ) return res.status(400).json({ error: 'Id argument is not a number'});

    const todo = todos.find( (todo) => todo.id === id)
    if( !todo ) return res.status(404).json({ error: `Todo with id ${id} not found`});

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;
    ( completedAt === 'null' )
      ? todo.completedAt = null!
      : todo.completedAt = new Date( completedAt || todo.completedAt )

    return res.json(todo);
  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if( isNaN(id) ) return res.status(400).json({ error: 'Id argument is not a number'});
      
    const todo = todos.find( (todo) => todo.id === id)
    if( !todo ) return res.status(404).json({ error: `Todo with id ${id} not found`});

    todos.splice( todos.indexOf(todo), 1)
    // todos.filter( todo => todo.id !== id );
    
    return res.status(200).json(todo);
  }
}