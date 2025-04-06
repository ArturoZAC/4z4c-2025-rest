import {  Router } from "express";
import { TodosController } from "./todos-controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";

export class TodoRoutes {

  public static get routes(): Router {

    const router = Router();
    const todoDatasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl( todoDatasource );
    const todoController = new TodosController( todoRepository );

    router.post('/', todoController.createTodo )
    router.get('/', todoController.getTodos )
    router.get('/:id', todoController.getTodo )
    router.put('/:id', todoController.updatedTodo )
    router.delete('/:id', todoController.deleteTodo )

    return router;
  }

}