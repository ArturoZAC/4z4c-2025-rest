import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {

  public async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    
    const todo = await prisma.todo.create({
      data: createTodoDto
    })

    return TodoEntity.fromObject(todo);
  }
  public async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById( updateTodoDto.id );

    const {id: updatedId, ...rest} = updateTodoDto!;

    const updatedTodo = await prisma.todo.update({
      where: { id: updatedId },
      data: rest
    })

    return TodoEntity.fromObject(updatedTodo);
  }
  public async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    const test= todos.map( todo => TodoEntity.fromObject( todo ));
    
    return todos.map( todo => TodoEntity.fromObject( todo ));
  }
  public async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
      where: { id }
    })

    if( !todo ) throw new Error(`Todo with id ${id} not found`);

    return TodoEntity.fromObject(todo);
  }
  public async deletedById(id: number): Promise<TodoEntity> {
    await this.findById( id );

    const deletedTodo = await prisma.todo.delete({
      where: { id }
    })

    return TodoEntity.fromObject(deletedTodo);
  }

}