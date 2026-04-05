export interface Crumb {
	label: string;
	href?: string;
}

export const breadcrumbs = $state({ crumbs: [] as Crumb[] });

export function setCrumbs(crumbs: Crumb[]) {
	breadcrumbs.crumbs = crumbs;
}

export function clearCrumbs() {
	breadcrumbs.crumbs = [];
}
