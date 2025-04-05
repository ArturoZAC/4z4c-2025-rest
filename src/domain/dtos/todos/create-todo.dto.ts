import { z } from "zod";

export class CreateTodoDto {

  private constructor(
    public readonly text: string,
  ){}

  public static schema = z.object({ 
    text: z.string().min(1).trim()
  })

  public static create( props: z.infer< typeof this.schema>): [string?, CreateTodoDto?] {

    const result = this.schema.safeParse(props);

    if (!result.success) {
      return [`The property '${result.error.errors[0].path[0] || 'text'}' is required`, undefined];
    }

    return [undefined, new CreateTodoDto(result.data.text)];
  }


}