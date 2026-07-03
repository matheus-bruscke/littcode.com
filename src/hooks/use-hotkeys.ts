"use client";
import { useEffect, useRef } from "react";

type HotkeyConfig = {
	targetKey: string;
	callback: (event: KeyboardEvent) => void;
	ignoreInputs?: boolean;
};

function isTypingTarget(target: EventTarget | null) {
	return (
		target instanceof HTMLInputElement ||
		target instanceof HTMLTextAreaElement ||
		(target instanceof HTMLElement && target.isContentEditable)
	);
}

function useCustomHotkey(hotkeys: HotkeyConfig[]) {
	const hotkeysRef = useRef(hotkeys);

	useEffect(() => {
		hotkeysRef.current = hotkeys;
	});

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const key = event.key.toLowerCase();

			for (const hotkey of hotkeysRef.current) {
				if (key !== hotkey.targetKey.toLowerCase()) continue;

				const ignoreInputs = hotkey.ignoreInputs ?? true;
				if (ignoreInputs && isTypingTarget(event.target)) return;

				event.preventDefault();
				hotkey.callback(event);
				return;
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
}

export type { HotkeyConfig };
export { useCustomHotkey };
