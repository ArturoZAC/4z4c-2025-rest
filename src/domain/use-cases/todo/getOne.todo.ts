import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetOneTodoUseCase {
  execute( id: number ): Promise<TodoEntity>;
}

export class GetOneTodo implements GetOneTodoUseCase {

  constructor(
    private readonly repository: TodoRepository
  ){}

  execute( id: number ): Promise<TodoEntity> {
    return this.repository.findById(id);
  }

}