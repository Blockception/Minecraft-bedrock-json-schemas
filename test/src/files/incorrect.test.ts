import { Schema } from "../schema-tester";
import { Files } from "../utillity";

describe("test incorrect files", function () {
  const folder = Files.InCorrectFilesFolder().replace(/\\/gi, "/");
  const files = Files.GetFiles(folder).filter((f) => f.endsWith(".json"));
  const validator = Schema.GetValidator();

  expect(files.length).toBeGreaterThan(0);

  test.each(files)("File should invalidate & have a schema: %s", async (file) => {
    const result = validator.ValidateFile(file);
    const schemas = validator.ls.getMatchingSchemas(result.doc, result.jdoc);

    const success = await result.promise;
    expect(success.length).toBeGreaterThan(0);
    const s = await schemas;
    expect(s.length).toBeGreaterThan(0);
  });
});
