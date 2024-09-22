import { Github } from "../github";
import { Schema } from "../schema-tester";
import { Files } from "../utillity";

describe("test correct files", function () {
  const folder = Files.CorrectFilesFolder().replace(/\\/gi, "/");
  const files = Files.GetFiles(folder).filter((f) => f.endsWith(".json"));
  const validator = Schema.GetValidator();

  expect(files.length).toBeGreaterThan(0);

  test.each(files)("File should have a schema & validate correctly: %s", async (file) => {
    const result = validator.ValidateFile(file);
    const schemas = validator.ls.getMatchingSchemas(result.doc, result.jdoc);

    const succes = await result.promise;

    expect(succes).toHaveLength(0);
    succes.forEach((item) => console.log(item.message));

    const s = await schemas;
    expect(s.length).toBeGreaterThan(0);
  });
});
