import { z } from "zod";

export const userPasswordChangeFormScheme = z.object({
	oldPassword: z.string(),
	password: z.string().min(8, "The password must contain at least 8 characters"),
	passwordRepeat: z.string()
}).refine(data => data.password === data.passwordRepeat, {
	message: "Passwords don't match",
	path: ["passwordRepeat"]
});

export type UserPasswordChangeFormType = z.infer<typeof userPasswordChangeFormScheme>;