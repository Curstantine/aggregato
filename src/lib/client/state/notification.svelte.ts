type Notification = {
	id: string;
	label: string;
	description: string;
	progress?: [number, number];
};

export const notificationState = $state({
	data: [] as Notification[]
});

export function addNotification(payload: Omit<Notification, "id">): string {
	const id = crypto.randomUUID();
	notificationState.data.push({ ...payload, id });
	return id;
}

export function removeNotification(id: string) {
	notificationState.data = notificationState.data.filter((x) => x.id !== id);
}

export function updateNotification(id: string, payload: Partial<Omit<Notification, "id">>) {
	const idx = notificationState.data.findIndex((x) => x.id === id);
	if (idx !== -1) {
		notificationState.data[idx] = { ...notificationState.data[idx], ...payload };
	}
}

export function upsertNotification(
	id: string | null | undefined,
	payload: Omit<Notification, "id">
): string {
	if (id) {
		updateNotification(id, payload);
		return id;
	}

	return addNotification(payload);
}
