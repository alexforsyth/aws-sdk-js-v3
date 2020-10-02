import { Readable } from "stream";
import { chunkFromReadable } from "../../src/data-chunk/readable-helper";
import { DataPart } from "../../src/data-chunk/yield-chunk";
const fs = require("fs");
const fileStream = fs.createReadStream(
  "/Users/alexfors/Documents/workspace/sdk/alexfors/aws-sdk-js-v3/experimental/storage/test/data-chunk/sample.file"
);

describe(chunkFromReadable.name, () => {
  const INPUT_STRING = "Farmer jack realized that big yellow quilts were expensive";

  describe("Proper chunk creation", () => {
    let chunks: IteratorResult<DataPart>[] = [];
    const CHUNK_SIZE = 30;

    const setup = async () => {
      const chunks: IteratorResult<DataPart>[] = [];
      const readableStream = Readable.from(INPUT_STRING);
      const interation = chunkFromReadable(readableStream, CHUNK_SIZE);
      chunks.push(await interation.next());
      chunks.push(await interation.next());
      chunks.push(await interation.next());
      return chunks;
    };

    beforeAll(async (done) => {
      chunks = await setup();
      done();
    });

    it("should properly give the first chunk", async (done) => {
      expect(chunks[0].done).toEqual(false);
      expect(chunks[0].value.Body.toString()).toEqual("Farmer jack realized that big ");
      expect(chunks[0].value.Body.length).toEqual(30);
      expect(chunks[0].value.PartNumber).toEqual(1);
      done();
    });

    it("should properly give the second (smaller) chunk", async (done) => {
      expect(chunks[1].done).toEqual(false);
      expect(chunks[1].value.Body.toString()).toEqual("yellow quilts were expensive");
      expect(chunks[1].value.Body.length).toEqual(28);
      expect(chunks[1].value.PartNumber).toEqual(2);
      done();
    });

    it("should properly end the interation", async (done) => {
      expect(chunks[2].done).toEqual(true);
      expect(chunks[2].value).toEqual(undefined);
      done();
    });
  });

  describe("Proper single chunk", () => {
    let chunks: IteratorResult<DataPart>[] = [];
    const CHUNK_SIZE = 1000;

    const setup = async () => {
      const chunks: IteratorResult<DataPart>[] = [];
      const readableStream = Readable.from(INPUT_STRING);
      const interation = chunkFromReadable(readableStream, CHUNK_SIZE);
      chunks.push(await interation.next());
      chunks.push(await interation.next());
      return chunks;
    };

    beforeAll(async (done) => {
      chunks = await setup();
      done();
    });

    it("should properly give the first chunk as all the data", async (done) => {
      expect(CHUNK_SIZE).toBeGreaterThan(INPUT_STRING.length);
      expect(chunks[0].done).toEqual(false);
      expect(chunks[0].value.Body.toString()).toEqual(INPUT_STRING);
      expect(chunks[0].value.Body.length).toEqual(INPUT_STRING.length);
      expect(chunks[0].value.PartNumber).toEqual(1);
      done();
    });

    it("should properly end the interation", async (done) => {
      expect(chunks[1].done).toEqual(true);
      expect(chunks[1].value).toEqual(undefined);
      done();
    });
  });

  describe("Proper no data chunk", () => {
    let chunks: IteratorResult<DataPart>[] = [];
    const CHUNK_SIZE = 10;

    const setup = async () => {
      const chunks: IteratorResult<DataPart>[] = [];
      const readableStream = Readable.from([]);
      const interation = chunkFromReadable(readableStream, CHUNK_SIZE);
      chunks.push(await interation.next());
      chunks.push(await interation.next());
      return chunks;
    };

    beforeAll(async (done) => {
      chunks = await setup();
      done();
    });

    it("should return an empty object", async (done) => {
      expect(chunks[0].done).toEqual(false);
      expect(chunks[0].value.Body.toString()).toEqual("");
      done();
    });

    it("should properly end the interation", async (done) => {
      expect(chunks[1].done).toEqual(true);
      expect(chunks[1].value).toEqual(undefined);
      done();
    });
  });

  describe("Properly chunks files", () => {
    let chunks: IteratorResult<DataPart>[] = [];
    const CHUNK_SIZE = 30;

    const setup = async () => {
      const chunks: IteratorResult<DataPart>[] = [];
      const interation = chunkFromReadable(fileStream, CHUNK_SIZE);
      chunks.push(await interation.next());
      chunks.push(await interation.next());
      chunks.push(await interation.next());
      return chunks;
    };

    beforeAll(async (done) => {
      chunks = await setup();
      expect(1).toEqual(1);
      done();
    });

    it("should properly give the first chunk", async (done) => {
      expect(chunks[0].done).toEqual(false);
      expect(chunks[0].value.Body.toString()).toEqual("Farmer jack realized that big ");
      expect(chunks[0].value.Body.length).toEqual(30);
      expect(chunks[0].value.PartNumber).toEqual(1);
      done();
    });

    // it("should properly give the second (smaller) chunk", async (done) => {
    //   expect(chunks[1].done).toEqual(false);
    //   expect(chunks[1].value.Body.toString()).toEqual("yellow quilts were expensive");
    //   expect(chunks[1].value.Body.length).toEqual(28);
    //   expect(chunks[1].value.PartNumber).toEqual(2);
    //   done();
    // });

    // it("should properly end the interation", async (done) => {
    //   expect(chunks[2].done).toEqual(true);
    //   expect(chunks[2].value).toEqual(undefined);
    //   done();
    // });
  });
});
