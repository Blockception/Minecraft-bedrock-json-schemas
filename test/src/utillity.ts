import * as FastGlob from "fast-glob";
import * as path from "path";

export namespace Files {
  export function TestFolder(): string {
    return path.join(__dirname, "..", "..", "test");
  }

  export function RootFolder(): string {
    return path.join(TestFolder(), "..");
  }

  export function FilesFolder(): string {
    return path.join(TestFolder(), "files");
  }

  export function CorrectFilesFolder(): string {
    return path.join(FilesFolder(), "correct");
  }

  export function InCorrectFilesFolder(): string {
    return path.join(FilesFolder(), "incorrect");
  }

  export function GetFiles(cwd: string): string[] {
    if (!cwd.endsWith("/") && !cwd.endsWith("\\")) cwd += "/";

    cwd = cwd.replace("\\", "/");

    const options: FastGlob.Options = { onlyFiles: true, absolute: true, cwd: cwd };
    const entries = FastGlob.sync(["*.json", "**/*.json"], options);

    return entries;
  }
}
