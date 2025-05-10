import { z } from "zod";

export const signupFormScheme = z.object({
	email: z.string().email("Enter the correct email address"),
	name: z.string().min(2, "The name must contain at least two characters"),
	password: z.string().min(8, "The password must contain at least 8 characters"),
	passwordRepeat: z.string()
}).refine(data => data.password === data.passwordRepeat, {
	message: "Passwords don't match",
	path: ['passwordRepeat']
});

export type SignupFormType = z.infer<typeof signupFormScheme>;