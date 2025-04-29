type ActiveNotification = {
	id: string;
	label: string;
	description: string;
	progress: [number, number];
};

export const notificationState = $state({
	active: [] as ActiveNotification[]
});

export function addNotification(payload: Omit<ActiveNotification, "id">): string {
	const id = crypto.randomUUID();
	notificationState.active.push({ ...payload, id });
	return id;
}

export function removeNotification(id: string) {
	notificationState.active = notificationState.active.filter((x) => x.id !== id);
}

export function updateNotification(id: string, payload: Partial<Omit<ActiveNotification, "id">>) {
	const idx = notificationState.active.findIndex((x) => x.id === id);
	if (idx !== -1) {
		notificationState.active[idx] = { ...notificationState.active[idx], ...payload };
	}
}

export function upsertNotification(
	id: string | null | undefined,
	payload: Omit<ActiveNotification, "id">
): string {
	if (id) {
		updateNotification(id, payload);
		return id;
	}

	return addNotification(payload);
}
