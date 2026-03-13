import { Resend } from "resend";

import { EMAIL_AUTH_ADDRESS, EMAIL_AUTH_NAME, RESEND_API_SECRET } from "$env/static/private";

export const resend = new Resend(RESEND_API_SECRET);

export async function sendPasswordResetEmail(
	email: string,
	name: string,
	resetToken: string,
	resetLink: string
) {
	if (import.meta.env.DEV) {
		console.log(
			"Email sent to:",
			email,
			"with reset link:",
			resetLink,
			"and token:",
			resetToken
		);
	}

	const { data, error } = await resend.emails.send({
		from: `${EMAIL_AUTH_NAME} <${EMAIL_AUTH_ADDRESS}>`,
		to: email,
		subject: "Reset your password",
		template: {
			id: "aggregato-reset",
			variables: {
				name,
				reset_token: resetToken,
				reset_link: resetLink
			}
		}
	});

	if (error) {
		console.error("Failed to send password reset email:", error);
		throw new Error("Failed to send email", { cause: error });
	}

	return data;
}
