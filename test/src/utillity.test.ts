import { expect } from "chai";
import { DummyFiles } from "../../src/main";
import { Files } from "./utillity";

describe("Files", function () {
  it("Root", function () {
    const temp = Files.RootFolder();

    expect(temp.endsWith("lib"), "ended with lib").to.be.false;
    expect(temp.endsWith("lib\\test"), "ended with lib\\test").to.be.false;
    expect(temp.endsWith("lib/test"), "ended with lib/test").to.be.false;
  });

  it("Test", function () {
    const temp = Files.TestFolder();

    expect(temp.endsWith("lib"), "ended with lib").to.be.false;
  });
});
