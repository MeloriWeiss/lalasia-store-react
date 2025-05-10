import { z } from "zod";

export const checkoutFormScheme = z.object({
	name: z.string().min(2, "The name must contain at least two characters"),
	phone: z.string().regex(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, "Enter the correct phone number"),
	email: z.string().email("Enter the correct email address"),
	address: z.string().min(5, 'Enter the correct address'),
	comment: z.string().optional()
});

export type CheckoutFormType = z.infer<typeof checkoutFormScheme>;