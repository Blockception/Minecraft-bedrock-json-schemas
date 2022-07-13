import { expect } from "chai";
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

        it("schemas", function () {
          return schemas.then(
            (success) => {
              expect(success.length, "Expected schemas to be returned").to.greaterThan(0);
            },
            (fail) => {
              expect.fail("failed on retrieving schemas");
            }
          );
        });

        it("validation", function () {
          result.promise.then(
            (succes) => {
              expect(succes.length, "Expected errors! but had none").to.greaterThan(0);
            },
            (fail) => {
              expect.fail("Failed to validate");
            }
          );

          return result.promise;
        });

        return Promise.all([schemas, result]);
      });
    });
});
