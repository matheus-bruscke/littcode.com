import { useEffect, useState } from "react";

const useIsVisible = (ref: React.RefObject<HTMLElement>) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsVisible(entry.isIntersecting);
		});

		observer.observe(ref.current);

		return () => observer.disconnect();
	});

	return isVisible;
};

export { useIsVisible };
