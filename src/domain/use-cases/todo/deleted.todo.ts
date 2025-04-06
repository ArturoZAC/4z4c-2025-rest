import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface DeletedTodoUseCase {
  execute( id: number ): Promise<TodoEntity>;
}

export class DeletedTodo implements DeletedTodoUseCase {

  constructor(
    private readonly repository: TodoRepository
  ){}

  execute( id: number ): Promise<TodoEntity> {
    return this.repository.deletedById(id);
  }

}