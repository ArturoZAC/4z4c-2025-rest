import { z } from "zod";

export class UpdateTodoDto {

  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly createdAt?: Date
  ) {}

  public static schema = z.object({
    id: z.number().min(1), 
    text: z.string().min(1).trim().optional(),
    createdAt: z.string().refine( val => !val || !isNaN(new Date(val).getTime()), {
      message: 'createdAt is not a valid Date'
    }).transform( val => val ? new Date(val) : null).optional(),
  });

  public static update(props: z.infer<typeof this.schema>): [string?, UpdateTodoDto?] {
    const result = this.schema.safeParse(props);

    if (!result.success) {
      return [`${result.error.errors[0].message}`, undefined];
    }

    const { id, createdAt, text } = result.data;
    return [undefined, new UpdateTodoDto(id, text, createdAt!)];
  }
}
