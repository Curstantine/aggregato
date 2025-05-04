import { Column, eq, type GetColumnData, type SQLWrapper } from "drizzle-orm";

export const eqn = <TColumn extends Column>(
	left: TColumn,
	right: GetColumnData<TColumn, "raw"> | SQLWrapper | null | undefined
) => {
	if (right === null || right === undefined) return undefined;
	return eq(left, right);
};
