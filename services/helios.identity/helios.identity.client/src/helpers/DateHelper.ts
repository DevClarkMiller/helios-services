export const humanizeDateFromIso = (iso: string) => {
	const date = new Date(iso + 'Z');
	return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

export const humanizeDate = (date: Date) => humanizeDateFromIso(date.toISOString());
