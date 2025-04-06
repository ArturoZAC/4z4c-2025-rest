import { z } from "zod";

export class CreateTodoDto {

  private constructor(
    public readonly text: string,
    public readonly createdAt?: Date | null,
  ) {}

  public static schema = z.object({
    text: z.string({ message: 'The property text is Required' })
    .min(1, { message: '"text" must have at least 1 letter' })
    .trim(),
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
    .transform( val => val ? new Date(val) : null)
    .optional()
  });

  public static create(props: z.infer<typeof this.schema>): [string?, CreateTodoDto?] {

    const result = this.schema.safeParse(props);

    if (!result.success) {
      const firstError = result.error.errors[0];
      const customMessage = firstError?.message === 'Required' 
                              ? 'Request body is missing or valid' 
                              : firstError.message
      return [customMessage, undefined];
    }

    const { createdAt, text } = result.data;

    return [undefined, new CreateTodoDto(text, createdAt)];
  }
}
