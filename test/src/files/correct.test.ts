import { expect } from "chai";
import { Schema } from "../SchemaTester";
import { Files } from "../Utillity";

describe("test correct files", () => {
  const folder = Files.CorrectFilesFolder().replace(/\\/gi, "/");
  const files = Files.GetFiles(folder);
  const validator = Schema.GetValidator();

  expect(files.length, "No files were returned").to.greaterThan(0);

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const testfolder = file.replace(folder + "/", "");

      describe(testfolder, () => {
        const result = validator.ValidateFile(file);
        const schemas = validator.ls.getMatchingSchemas(result.doc, result.jdoc);

        it("validation", () => {
          result.promise.then(
            (succes) => {
              expect(succes.length, "Expected no errors got: " + succes.length).to.equal(0);
              succes.forEach((item) => console.log(item.message));
            },
            (fail) => {
              expect.fail("Failed to validate");
            }
          );

          return result.promise;
        });

        it("schemas", () => {
          return schemas.then(
            (success) => {
              expect(success.length, "Expected schemas to be returned").to.greaterThan(0);
            },
            (fail) => {
              expect.fail("failed on retrieving schemas");
            }
          );
        });

        return Promise.all([result.promise, schemas]);
      });
    }
  });
});
