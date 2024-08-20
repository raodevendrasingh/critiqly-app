export const timesAgo = (date: string): string => {
	const now = new Date();
	const past = new Date(date);
	const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

	const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 },
		{ label: "week", seconds: 604800 },
		{ label: "day", seconds: 86400 },
		{ label: "hour", seconds: 3600 },
		{ label: "minute", seconds: 60 },
		{ label: "second", seconds: 1 },
	];

	for (const interval of intervals) {
		const count = Math.floor(diffInSeconds / interval.seconds);
		if (count > 0) {
			return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
		}
	}

	return "just now";
}
