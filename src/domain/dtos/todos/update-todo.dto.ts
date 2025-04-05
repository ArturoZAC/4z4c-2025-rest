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
    createdAt: z.string().refine(date => !isNaN(Date.parse(date))).optional(),
  });

  public static update(props: z.infer<typeof this.schema>): [string?, UpdateTodoDto?] {
    const result = this.schema.safeParse(props);

    if (!result.success) {
      return [`The property '${result.error.errors[0].path[0]}' is invalid or missing`, undefined];
    }

    const { id, createdAt, text } = result.data;
    const newCompletedAt = createdAt ? new Date(createdAt) : undefined;

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt!)];
  }
}
