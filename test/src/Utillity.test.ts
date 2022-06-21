import { expect } from "chai";
import { DummyFiles } from "../../src/main";
import { Files } from "./Utillity";

describe("Files", () => {
  it("Root", () => {
    const temp = Files.RootFolder();

    expect(temp.endsWith("lib"), "ended with lib").to.be.false;
    expect(temp.endsWith("lib\\test"), "ended with lib\\test").to.be.false;
    expect(temp.endsWith("lib/test"), "ended with lib/test").to.be.false;
  });

  it("Test", () => {
    const temp = Files.TestFolder();

    expect(temp.endsWith("lib"), "ended with lib").to.be.false;
  });

  it("Random", () => {
    expect(Files.TestFolder()).to.equal(DummyFiles.TestFolder());
  });
});
