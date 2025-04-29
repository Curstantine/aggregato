type ActiveNotification = { label: string; progress: number; endStep: number };

export const notificationState = $state({
	active: [{ label: "Sync in process", endStep: 250, progress: 50 }] as ActiveNotification[]
});
