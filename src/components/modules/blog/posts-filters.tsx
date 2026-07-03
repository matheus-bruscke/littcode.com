"use client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useRef } from "react";
import { Input } from "@/components/shared/input";
import { Tag } from "@/components/shared/tag";
import { useCustomHotkey } from "@/hooks/use-hotkeys";

type PostsFiltersProps = {
	tags: string[];
};

const PostsFilters = ({ tags }: PostsFiltersProps) => {
	const [search, setSearch] = useQueryState("q", {
		defaultValue: "",
	});

	const [selectedTags, setSelectedTags] = useQueryState(
		"tag",
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const inputRef = useRef<HTMLInputElement | null>(null);

	useCustomHotkey([
		{
			targetKey: "/",
			callback: () => {
				if (inputRef.current?.value !== "") {
					inputRef.current?.select();
				}
				inputRef.current?.focus();
			},
		},
		{
			targetKey: "Escape",
			callback: () => {
				const input = inputRef.current;
				if (!input || document.activeElement !== input) return;

				input.blur();
			},
			ignoreInputs: false,
		},
	]);

	const onClickTag = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
			return;
		}

		setSelectedTags([...selectedTags, tag]);
	};

	return (
		<div className="flex flex-col gap-4 pl-4">
			<Input
				placeholder={"Press [ / ] to search..."}
				className="-ml-4 h-10 md:h-9"
				ref={inputRef}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<span className="text-label-12 uppercase text-ds-border-hover">Tags</span>
			<div className="flex items-center md:flex-wrap overflow-x-auto gap-4">
				{tags.map((tag) => {
					const isSelected = selectedTags.includes(tag);
					return (
						<Tag
							variant={isSelected ? "active" : "default"}
							label={tag}
							key={tag}
							onClick={() => onClickTag(tag)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export { PostsFilters };
