import fs from "node:fs";
import path from "node:path";
import { default as matter } from "gray-matter";
import { type PostMeta, postMetaSchema } from "./models";

class PostsService {
	path = path.join(process.cwd(), "public", "posts");
	schema = postMetaSchema;

	public async getAll() {
		const posts: PostMeta[] = [];

		const postsDir = path.join(this.path);
		const postsFiles = fs.readdirSync(postsDir);

		for (const filename of postsFiles) {
			if (!filename.endsWith(".md")) continue;
			if (filename === "README.md") continue;

			const frontMatter = await this.getPostMeta(filename);

			posts.push(frontMatter);
		}

		return posts;
	}

	public async getAllSlugs() {
		const postsDir = path.join(this.path);
		const postsFiles = fs.readdirSync(postsDir);

		const slugs = [];

		for (const file of postsFiles) {
			if (!file.endsWith(".md")) continue;
			if (file === "README.md") continue;

			const slug = file.replace(/\.md?$/, "");

			slugs.push(slug);
		}

		return slugs;
	}

	public async getTags() {
		const posts = await this.getAll();
		return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
	}

	public async getPostMeta(filename: string) {
		const filePath = path.join(this.path, filename);
		const fileContent = fs.readFileSync(filePath, "utf-8");
		const { data } = matter(fileContent);
		return this.schema.parse(data);
	}

	public getPostContent(filename: string) {
		const filePath = path.join(this.path, filename);
		const fileContent = fs.readFileSync(filePath, "utf-8");
		const { content } = matter(fileContent);
		return content;
	}
}

export { PostsService };
