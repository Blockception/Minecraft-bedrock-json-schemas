import { Files } from "./utillity";

describe("Files", function () {
  it("Root", function () {
    const temp = Files.RootFolder();

    expect(temp.endsWith("lib")).toBeFalsy();
    expect(temp.endsWith("lib\\test")).toBeFalsy();
    expect(temp.endsWith("lib/test")).toBeFalsy();
  });

  it("Test", function () {
    const temp = Files.TestFolder();

    expect(temp.endsWith("lib")).toBeFalsy();
  });
});
