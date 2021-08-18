import path from "path";

export namespace Files {
	export function TestFolder(): string {
		return __dirname;
	}

	export function FilesFolder(): string {
		return path.join(TestFolder(), "files");
	}
}
