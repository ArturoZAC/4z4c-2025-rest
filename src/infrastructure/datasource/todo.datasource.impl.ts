import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {

  public create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  public updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  public async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map( todo => TodoEntity.fromObject( todo ));
  }
  public findById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  public deletedByUd(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

}