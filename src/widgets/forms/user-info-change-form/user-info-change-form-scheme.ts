import { z } from "zod";

export const userInfoChangeFormScheme = z.object({
	name: z.string().min(2, 'The name must contain at least two characters'),
	email: z.string().email('Enter the correct email address'),
	phone: z.string().regex(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, 'Enter the correct phone number')
});

export type UserInfoChangeFormType = z.infer<typeof userInfoChangeFormScheme>;