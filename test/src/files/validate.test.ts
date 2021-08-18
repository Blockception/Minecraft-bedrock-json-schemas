import { expect } from "chai";
import { Schema } from "../SchemaTester";
import { Files } from "../Utillity";

describe("test correct files", () => {
  const folder = Files.CorrectFilesFolder();
  const files = Files.GetFiles(folder);
  const validator = Schema.GetValidator();

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const testfolder = file.replace(folder, "");

      test(testfolder, (done) => {
        let result = validator.ValidateFile(file);

        result.promise.then(
          (succes) => {
            expect(succes.length, "Expected no errors got: " + JSON.stringify(succes)).to.equal(0);
            done();
          },
          (fail) => {
            expect.fail("Failed to validate");
            done();
          }
        );
      });
    }
  });
});
