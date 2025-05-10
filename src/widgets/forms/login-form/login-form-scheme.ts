import { z } from "zod";

export const loginFormScheme = z.object({
	email: z.string().email('Enter the correct email address'),
	password: z.string().min(8, 'The password must contain at least 8 characters')
});

export type LoginFormType = z.infer<typeof loginFormScheme>;