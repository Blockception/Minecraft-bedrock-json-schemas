import { expect } from "chai";
import { Github } from "../github";
import { Schema } from "../schema-tester";
import { Files } from "../utillity";

describe("test incorrect files", function () {
  const folder = Files.InCorrectFilesFolder().replace(/\\/gi, "/");
  const files = Files.GetFiles(folder);
  const validator = Schema.GetValidator();

  expect(files.length, "No files were returned").to.greaterThan(0);

  files
    .filter((f) => f.endsWith(".json"))
    .forEach((file) => {
      const testfolder = file.replace(folder + "/", "");

      it(`File should invalidate & have a schema: ${testfolder}`, async function () {
        const result = validator.ValidateFile(file);
        const schemas = validator.ls.getMatchingSchemas(result.doc, result.jdoc);

        result.promise.then(
          (succes) => {
            expect(succes.length, "Expected errors! but had none").to.greaterThan(0);
          },
          () => {
            Github.createError("No errors where found", { file: file });
            expect.fail("Failed to validate");
          }
        );
        schemas.then(
          (success) => {
            expect(success.length, "Expected schemas to be returned").to.greaterThan(0);
          },
          () => {
            Github.createError("Found no schema", { file: file });
            expect.fail("failed on retrieving schemas");
          }
        );

        return Promise.all([schemas, result]);
      });
    });
});
