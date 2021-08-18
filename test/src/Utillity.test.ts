import { expect } from "chai";
import { Files } from "./Utillity";

describe("files", () => {
  it("Root", () => {
    const temp = Files.RootFolder();
    console.log(temp);

    expect(temp.endsWith("lib"), "ended with lib").to.be.false;
    expect(temp.endsWith("lib\\test"), "ended with lib\\test").to.be.false;
    expect(temp.endsWith("lib/test"), "ended with lib/test").to.be.false;
  });

  it("Test", () => {
    const temp = Files.TestFolder();
    console.log(temp);

    expect(temp.endsWith("lib"), "ended with lib").to.be.false;
  });
});
