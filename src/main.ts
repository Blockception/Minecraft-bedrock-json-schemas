import path = require("path");

export namespace DummyFiles {
  export function TestFolder(): string {
    return path.join(__dirname, "..", "..", "test");
  }
}
