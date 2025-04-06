import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {

  public constructor(
    private readonly datasource: TodoDatasource
  ){}

  public create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create( createTodoDto );
  }
  public updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById( updateTodoDto );
  }
  public getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  public findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById( id );
  }
  public deletedById(id: number): Promise<TodoEntity> {
    return this.datasource.deletedById( id );
  }
}