import { expect } from "chai";
import { Github } from "../Github";
import { Schema } from "../SchemaTester";
import { Files } from "../Utillity";

describe("test correct files", function () {
  const folder = Files.CorrectFilesFolder().replace(/\\/gi, "/");
  const files = Files.GetFiles(folder);
  const validator = Schema.GetValidator();

  expect(files.length, "No files were returned").to.greaterThan(0);

  files
    .filter((f) => f.endsWith(".json"))
    .forEach((file) => {
      const testfolder = file.replace(folder + "/", "");

      describe(testfolder, function () {
        it("File should have a schema & validate correctly", async function () {
          const result = validator.ValidateFile(file);
          const schemas = validator.ls.getMatchingSchemas(result.doc, result.jdoc);

          result.promise.then(
            (succes) => {
              expect(succes.length, "Expected no errors got: " + succes.length).to.equal(0);
              succes.forEach((item) => console.log(item.message));
            },
            (fail) => {
              Github.createError("Failed on validating", { file: file });
              expect.fail("Failed to validate");
            }
          );
          schemas.then(
            (success) => {
              expect(success.length, "Expected schemas to be returned").to.greaterThan(0);
            },
            (fail) => {
              Github.createError("Failed on retrieving schemas", { file: file });
              expect.fail("failed on retrieving schemas");
            }
          );

          return Promise.all([result.promise, schemas]);
        });
      });
    });
});
