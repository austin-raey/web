export function splitAlternating<T>(items: T[], columns: number): T[][] {
	return items.reduce<T[][]>(
		(result, item, index) => {
			result[index % columns]?.push(item);
			return result;
		},
		Array.from({ length: columns }, () => [])
	);
}
