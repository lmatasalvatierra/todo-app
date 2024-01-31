"use server";

import { z } from "zod";

export const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

const createTodoSchema = FormSchema.omit({ id: true });
export async function createTodo(formData: FormData) {
  const todo = createTodoSchema.safeParse(formData);
}
