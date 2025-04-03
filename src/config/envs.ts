import 'dotenv/config'; 
import z from 'zod';

const envsSchemaOff = z.object({
  PORT: z.string().transform(Number)
});

export const envs = envsSchemaOff.parse(process.env);
