import { Storage } from "../src/index";

describe(Storage.name, () => {
  it("Upload function defined on the storage object", () => {
    expect(new Storage().upload).toBeDefined();
  });
});
