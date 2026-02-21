import { Resend } from "resend";

import { EMAIL_AUTH_ADDRESS, EMAIL_AUTH_NAME, RESEND_API_TOKEN } from "$env/static/private";

export const resend = new Resend(RESEND_API_TOKEN);

export async function sendPasswordResetEmail(
	email: string,
	name: string,
	resetLink: string,
	resetToken: string
) {
	const { data, error } = await resend.emails.send({
		from: `${EMAIL_AUTH_NAME} <${EMAIL_AUTH_ADDRESS}>`,
		to: email,
		subject: "Reset your password",
		template: {
			id: "aggregato-reset",
			variables: {
				name,
				reset_link: resetLink,
				reset_token: resetToken
			}
		}
	});

	if (error) {
		console.error("Failed to send password reset email:", error);
		throw new Error("Failed to send email");
	}

	return data;
}
