import { useState } from "react";
import { z, ZodFormattedError, ZodSchema } from "zod";

export const useFormValidation = <T>(formScheme: ZodSchema<T>, formData: T, onSubmitExtra?: VoidFunction) => {
	const [hasValidationErrors, setHasValidationErrors] = useState(false);

	const validate = () => {
		const validationResult = formScheme.safeParse(formData);
		if (validationResult.success) {
			return undefined;
		}
		return validationResult.error.format();
	};

	const onSubmit = () => {
		if (validate()) {
			setHasValidationErrors(true);
			return;
		}
		onSubmitExtra?.();
	};

	const errors: ZodFormattedError<T> | undefined = hasValidationErrors ? validate() : undefined;

	return {
		validate,
		onSubmit,
		setHasValidationErrors,
		errors
	}
}