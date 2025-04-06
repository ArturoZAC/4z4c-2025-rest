import { z } from "zod";

export class TodoEntity {

  constructor(
    public id: number,
    public text: string,
    public createdAt?: Date | null
  ){}

  private static todoSchema = z.object({
    id: z.number().min(1, 'Id is required'),
    text: z.string().min(1, 'Text is required'), 
    createdAt: z.string()
    .refine(val => !val || !isNaN(new Date(val).getTime()), {
      message: 'createdAt is not a valid date',
    })
    .optional()
    .transform(val => val ? new Date(val) : null),
  });

  public isCreatedAt = () => {
    return !!this.createdAt;
  }

  public static fromObject( object: z.infer<typeof this.todoSchema>): TodoEntity {
    
    const result = this.todoSchema.safeParse({ ...object, createdAt: object.createdAt?.toISOString() });
    
    if (!result.success) {
      throw new Error(`${result.error.errors[0].message}`);
    }

    const { id, text, createdAt } = result.data;

    return new TodoEntity(id, text, createdAt );
  }

} 