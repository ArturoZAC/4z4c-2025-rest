import { z } from "zod";

export class CreateTodoDto {

  private constructor(
    public readonly text: string,
  ){}

  public static schema = z.object({ 
    text: z.string({message: 'The property Text is Required'}).min(1, { message: 'Text must have at least 1 letter'}).trim()
  })

  public static create( props: z.infer< typeof this.schema>): [string?, CreateTodoDto?] {

    const result = this.schema.safeParse(props);

    if (!result.success) {
      return [`${result.error.errors[0].message}`, undefined];
    }

    return [undefined, new CreateTodoDto(result.data.text)];
  }


}