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
    createdAt: z.string()
    .optional()
    .refine(val => {
      if (!val) return true;
      
      const date = new Date(val);
      return !isNaN(date.getTime()) && val === date.toISOString();
    }, {
      message: 'createdAt is not a valid date',
    })
    .transform( val => val ? new Date(val) : null)
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
