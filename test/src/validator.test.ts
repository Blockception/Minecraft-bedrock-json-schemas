import path = require("path");
import { Files } from "./utillity";
import * as fs from "fs";
import * as JSONC from "comment-json";
import { expect } from "chai";
import { ErrorAnnotation, Github } from "./github";

describe("Validate", function () {
  const folder = path.join(Files.TestFolder(), "..", "source");
  console.log(folder);
  const files = Files.GetFiles(folder);

  files.forEach((filepath) => {
    const filename = filepath.slice(folder.length);

    it(`Validating schema parts: ${filename}`, function () {
      let object: JsonSchema | undefined = undefined;
      let data: string;

      data = fs.readFileSync(filepath, "utf8");
      object = <JsonSchema>JSONC.parse(data);
      expect(object).to.not.be.undefined;
      expect(object).to.not.be.null;

      if (!object) {
        this.skip();
        return;
      }

      const explorer = new Explorer(data, filepath);
      explorer.explore_refs(object, path.dirname(filepath));
    });
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
          expect.fail(`ref ${ref} does not exists`);
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
