import { expect } from "chai";
import { Github } from "../Github";
import { Schema } from "../SchemaTester";
import { Files } from "../Utillity";

describe("test incorrect files", function () {
  const folder = Files.InCorrectFilesFolder().replace(/\\/gi, "/");
  const files = Files.GetFiles(folder);
  const validator = Schema.GetValidator();

  expect(files.length, "No files were returned").to.greaterThan(0);

  files
    .filter((f) => f.endsWith(".json"))
    .forEach((file) => {
      const testfolder = file.replace(folder + "/", "");

      describe(testfolder, function () {
        const result = validator.ValidateFile(file);
        const schemas = validator.ls.getMatchingSchemas(result.doc, result.jdoc);

        it("File should have a schema", function () {
          return schemas.then(
            (success) => {
              expect(success.length, "Expected schemas to be returned").to.greaterThan(0);
            },
            (fail) => {
              Github.createError("Found no schema", { file: file });
              expect.fail("failed on retrieving schemas");
            }
          );
        });

        it("File shoud return errors on validation", function () {
          result.promise.then(
            (succes) => {
              expect(succes.length, "Expected errors! but had none").to.greaterThan(0);
            },
            (fail) => {
              Github.createError("No errors where found", { file: file });
              expect.fail("Failed to validate");
            }
          );

          return result.promise;
        });

        return Promise.all([schemas, result]);
      });
    });
});
