function resolvePostCoverFilename(cover?: string) {
	if (!cover) return undefined;

	return cover
		.replace(/\[\[|\]\]/g, "")
		.replace(/^attachments\//, "");
}

function resolvePostCoverPath(cover?: string) {
	const filename = resolvePostCoverFilename(cover);

	if (!filename) return undefined;

	return `/posts/attachments/${filename}`;
}

export { resolvePostCoverFilename, resolvePostCoverPath };
