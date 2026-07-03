"use client";

import { useEffect, useState } from "react";

const timeZone = "America/Manaus";

const timeFormat: Intl.DateTimeFormatOptions = {
	timeZone,
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: true,
};

const dateFormat: Intl.DateTimeFormatOptions = {
	timeZone,
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "2-digit",
	timeZoneName: "shortOffset",
};

function formatTime(date: Date) {
	return date.toLocaleTimeString("en-US", timeFormat);
}

function formatDate(date: Date) {
	return date.toLocaleDateString("en-US", dateFormat);
}

function RealTimeDate() {
	const [mounted, setMounted] = useState(false);
	const [time, setTime] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		const update = () => {
			const now = new Date();
			setTime(formatTime(now));
			setDate(formatDate(now));
		};

		setMounted(true);
		update();

		const interval = setInterval(update, 1000);
		return () => clearInterval(interval);
	}, []);

	if (!mounted) {
		return (
			<span className="invisible" aria-hidden>
				00:00:00 AM
				<br />
				Monday, January 01, 2026 GMT-4
			</span>
		);
	}

	return (
		<span suppressHydrationWarning>
			{time}
			<br />
			{date}
		</span>
	);
}

export default RealTimeDate;
