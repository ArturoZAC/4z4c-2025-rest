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
    .transform(val => val.trim() === '' ? undefined : val) 
    .refine(val => {
      if (!val) return true;
      const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(val);
      const date = new Date(val);
      return isValidFormat && !isNaN(date.getTime());
    }, {
      message: 'createdAt must be a valid date in format yyyy-mm-dd',
    })
    .transform(val => val ? new Date(val) : null)
    .optional()
  });

  public static update(props: z.infer<typeof this.schema>): [string?, UpdateTodoDto?] {
    const result = this.schema.safeParse(props);
    console.log(props);
    

    if (!result.success) {
      return [`${result.error.errors[0].message}`, undefined];
    }

    const { id, createdAt, text } = result.data;
    return [undefined, new UpdateTodoDto(id, text, createdAt!)];
  }
}
