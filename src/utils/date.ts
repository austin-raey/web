const LONG_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
	day: "numeric",
	month: "long",
	timeZone: "America/New_York",
	year: "numeric"
});

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
	day: "numeric",
	month: "numeric",
	timeZone: "America/New_York",
	year: "numeric"
});

export function formatLongDate(date: Date) {
	return LONG_DATE_FORMATTER.format(date);
}

export function formatShortDate(date: Date) {
	return SHORT_DATE_FORMATTER.format(date);
}

export function toDateOnlyString(date: Date) {
	return date.toISOString().slice(0, 10);
}
