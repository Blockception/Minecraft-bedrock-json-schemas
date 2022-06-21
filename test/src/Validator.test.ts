import path = require("path");
import { Files } from "./Utillity";
import * as fs from "fs";
import * as JSONC from "comment-json";
import { expect } from "chai";

describe.only("Validate", () => {
  const folder = path.join(Files.TestFolder(), "..", "source");
  console.log(folder);
  const files = Files.GetFiles(folder);

  files.forEach((filepath) => {
    const filename = filepath.slice(folder.length);

    describe(filename, () => {
      let object: JsonSchema | undefined = undefined;
      let data: string;

      it("Can read file", () => {
        data = fs.readFileSync(filepath, "utf8");
      });

      it("Can parse to json", () => {
        object = <JsonSchema>JSONC.parse(data);
      });

      it("Not Undefined or null", () => {
        expect(object).to.not.be.undefined;
        expect(object).to.not.be.null;
      });

      it("Checking refs", () => {
        if (!object) {
          expect.fail();
          return;
        }

        explore_refs(object, path.dirname(filepath));
      });
    });
  });
});

interface JsonSchema {
  $ref?: string;
  [key: string]: any;
}

function explore_refs(data: JsonSchema, folder: string): void {
  if (data.$ref) {
    const ref = data.$ref;

    if (!ref.startsWith("#")) {
      const filepath = path.isAbsolute(ref) ? ref : path.join(folder, ref);

      expect(fs.existsSync(filepath), `ref ${ref} exists`).to.be.true;
    }
  }

  for (const key in data) {
    const element = data[key];

    switch (typeof element) {
      case "object":
        explore_refs(element, folder);
        break;
    }
  }
}
