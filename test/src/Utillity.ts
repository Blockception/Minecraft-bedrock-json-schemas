import FastGlob = require("fast-glob");
import path = require("path");

export namespace Files {
  export function TestFolder(): string {
    return path.join(__dirname, "..", "..", "..", "test");
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

  export function GetFiles(folder: string): string[] {
    if (!folder.endsWith("\\")) folder += "\\";

    folder = folder.replace("\\", "/");

    return FastGlob.sync(["*.json", "**/*.json"], { absolute: true, onlyFiles: true, cwd: folder });
  }
}
