import fs from "node:fs";
import path from "node:path";

function getMdnContent(filename: string) {
	const filePath = path.join(
		process.cwd(),
		"src",
		"contents",
		`${filename}.md`,
	);
	return fs.readFileSync(filePath, "utf8");
}

export default getMdnContent;
