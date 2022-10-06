import path = require("path");
import { Files } from "./Utillity";
import * as fs from "fs";
import * as JSONC from "comment-json";
import { expect } from "chai";
import { ErrorAnnotation, Github } from "./Github";

describe("Validate", function () {
  const folder = path.join(Files.TestFolder(), "..", "source");
  console.log(folder);
  const files = Files.GetFiles(folder);

  files.forEach((filepath) => {
    const filename = filepath.slice(folder.length);

    describe(filename, function () {
      let object: JsonSchema | undefined = undefined;
      let data: string;

      it("Can read file", function () {
        data = fs.readFileSync(filepath, "utf8");
      });

      it("Can parse to json", function () {
        object = <JsonSchema>JSONC.parse(data);
      });

      it("Not Undefined or null", function () {
        expect(object).to.not.be.undefined;
        expect(object).to.not.be.null;
      });

      it("Check refs", function () {
        if (!object) {
          this.skip();
          return;
        }

        const explorer = new Explorer(data, filepath);
        explorer.explore_refs(object, path.dirname(filepath));
      });
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

        if (fs.existsSync(filepath)) {
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
    let lines = 0;
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
