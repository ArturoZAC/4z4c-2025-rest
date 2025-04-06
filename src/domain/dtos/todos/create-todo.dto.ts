import { z } from "zod";

export class CreateTodoDto {

  private constructor(
    public readonly text: string,
    public readonly createdAt?: Date | null,
  ) {}

  public static schema = z.object({
    text: z.string({ message: 'The property text is Required' }).min(1, { message: '"text" must have at least 1 letter' }).trim(),
    createdAt: z.string().refine(val => !val || !isNaN(new Date(val).getTime()), {
      message: 'createdAt must be a valid date or omitted',
    }).optional().transform( val => val ? new Date(val) : null),
  });

  public static create(props: z.infer<typeof this.schema>): [string?, CreateTodoDto?] {
    const result = this.schema.safeParse(props);

    if (!result.success) {
      return [`${result.error.errors[0].message}`, undefined];
    }

    const { createdAt, text } = result.data;

    return [undefined, new CreateTodoDto(text, createdAt)];
  }
}
