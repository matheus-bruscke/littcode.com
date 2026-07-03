"use client";

import { cx } from "class-variance-authority";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";
import React from "react";
import { Frame } from "@/components/shared/frame";

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {}

function getCodeFromChildren(children: React.ReactNode): {
	code: string;
	className: string;
} {
	let code = "";
	let className = "";

	React.Children.forEach(children, (child) => {
		if (!React.isValidElement(child)) {
			return;
		}

		const childProps = child.props as {
			className?: string;
			children?: React.ReactNode;
		};

		className = childProps.className ?? "";
		code = String(childProps.children ?? "").replace(/\n$/, "");
	});

	return { code, className };
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, ...props }) => {
	const [isCopied, setIsCopied] = React.useState(false);
	const { code, className } = getCodeFromChildren(children);
	const language = /language-(\w+)/.exec(className)?.[1];

	const highlightedCode = React.useMemo(() => {
		if (!code) {
			return "";
		}

		if (language && hljs.getLanguage(language)) {
			return hljs.highlight(code, { language }).value;
		}

		return hljs.highlightAuto(code).value;
	}, [code, language]);

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<Frame className="mb-8">
			<pre
				className={cx(
					"group font-mono relative overflow-x-auto border border-dashed border-ds-border p-4",
				)}
				{...props}
			>
				<code
					className={cx("hljs text-sm leading-relaxed", className)}
					// biome-ignore lint/security/noDangerouslySetInnerHtml: hljs returns HTML markup
					dangerouslySetInnerHTML={{ __html: highlightedCode }}
				/>
				<button
					onClick={handleCopy}
					type="button"
					className="absolute top-2 right-2 cursor-pointer flex items-center justify-center text-neutral-500 opacity-0 transition-all hover:text-ds-primary group-hover:opacity-100"
				>
					{isCopied ? (
						<code className="text-label-12 text-ds-primary uppercase font-pixel">
							Copied
						</code>
					) : (
						<code className="text-label-12 text-ds-text-secondary uppercase font-pixel">
							Copy
						</code>
					)}
				</button>
			</pre>
		</Frame>
	);
};

export { CodeBlock };
