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

      it(testfolder, () => {
        let result = validator.ValidateFile(file);

        result.promise.then(
          (succes) => {
            expect(succes.length, "Expected no errors got: " + JSON.stringify(succes)).to.equal(0);
          },
          (fail) => {
            expect.fail("Failed to validate");
          }
        );

        return result.promise;
      });
    }
  });
});
