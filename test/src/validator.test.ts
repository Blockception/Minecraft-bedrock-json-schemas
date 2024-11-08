import * as JSONC from "comment-json";
import * as fs from "fs";
import * as path from "path";
import { ErrorAnnotation, Github } from "./github";
import { Files } from "./utillity";

describe("Validate", function () {
  const folder = path.join(Files.TestFolder(), "..", "source");
  const files = Files.GetFiles(folder);
  expect(files.length).toBeGreaterThan(0);

  test.each(files)("Validating schema parts: %s", (filepath) => {
    const data = fs.readFileSync(filepath, "utf8");
    const object = JSONC.parse(data) as JsonSchema;
    expect(object).toBeDefined();
    if (!object) {
      return;
    }

    const explorer = new Explorer(data, filepath);
    explorer.explore_refs(object, path.dirname(filepath));
  });
});

interface JsonSchema {
  $ref?: string;
  [key: string]: any;
}

class Explorer {
  text: string;
  filepath: string;

  constructor(text: string, filepath: string) {
    this.text = text;
    this.filepath = filepath;
  }

  public explore_refs(data: JsonSchema, folder: string): void {
    if (data.$ref) {
      const ref = data.$ref;

      if (!ref.startsWith("#")) {
        const filepath = path.isAbsolute(ref) ? ref : path.join(folder, ref);

        if (!fs.existsSync(filepath)) {
          const anno = this.find(ref);
          anno.title = "Ref not found";
          anno.file = this.filepath;

          Github.createError(`Ref not found: ${ref}`, anno);
          throw new Error(`ref ${ref} does not exists`);
        }
      }
    }

    for (const key in data) {
      const element = data[key];

      switch (typeof element) {
        case "object":
          this.explore_refs(element, folder);
          break;
      }
    }
  }

  find(data: string): ErrorAnnotation {
    const index = this.text.indexOf(data);
    let lines = 1;
    let lastindex = 0;

    for (let i = lastindex; i < index; i++) {
      const char = this.text[i];

      if (char === "\n") {
        lastindex = i;
        lines++;
      }
    }

    return {
      line: lines,
      column: index - lastindex,
    };
  }
}
