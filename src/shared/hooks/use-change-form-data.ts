import { useState } from "react";

export const useChangeFormData = <T>(initialState: T) => {
	const [formData, setFormData] = useState<T>(initialState);

	const changeFormData = (fieldName: string) => {
		return (value: string) => {
			setFormData({
				...formData,
				[fieldName]: value
			});
		};
	};

	return {
		formData,
		setFormData,
		changeFormData
	}
}