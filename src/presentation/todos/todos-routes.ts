import {  Router } from "express";
import { TodosController } from "./todos-controller";

export class TodoRoutes {

  public static get routes(): Router {

    const router = Router();
    const todoController = new TodosController();

    router.post('/', todoController.createTodo )
    router.get('/', todoController.getTodos )
    router.get('/:id', todoController.getTodo )
    router.put('/:id', todoController.updatedTodo )
    router.delete('/:id', todoController.deleteTodo )

    return router;
  }

}