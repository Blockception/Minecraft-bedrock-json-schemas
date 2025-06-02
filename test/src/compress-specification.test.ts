import { statSync } from "node:fs";
import * as specification from "../../source/compress_specification.json";
import * as path from "path";

describe("Compress Specification", function () {
  const files = specification.Files;

  test.each(files)("$Source", ({ Source }) => {
    const p = path.join(".", "source", Source);
    expect(statSync(p).isFile()).toBeTruthy();
  });
});
