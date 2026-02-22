import type { ActionFailure } from "@sveltejs/kit";

import type { Session, User } from "$lib/server/auth";
import type { FormSerArkErrors } from "$lib/server/validator/utils";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user?: User;
			session?: Session;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace ActionUtils {
		type GenericFormActionData<T = never> = ActionFailure<
			| T
			| {
					message: string;
					invalid: FormSerArkErrors | undefined;
			  }
		>;
	}
}

export {};
