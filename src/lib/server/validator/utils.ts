import { ArkErrors, type } from "arktype";

export const arkFormParser = type("FormData.parse");

export type SerArkError = { message: string };
export type FormSerArkErrors = Record<string, SerArkError>;

export function toSerArkErrors(errors: ArkErrors): Record<string, SerArkError> {
	return errors.reduce(
		(acc, x) => {
			acc[x.path.toString()] = { message: x.message };
			return acc;
		},
		{} as Record<string, SerArkError>
	);
}
