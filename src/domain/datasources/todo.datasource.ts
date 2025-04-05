import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {

  public abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;
  public abstract updateById( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;
  public abstract getAll(): Promise<TodoEntity[]>;
  public abstract findById( id: number ): Promise<TodoEntity>;
  public abstract deletedByUd( id: number ): Promise<TodoEntity>;

}