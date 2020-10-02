import { Buffer } from "buffer";
import { Readable } from "stream";
import { ReadableStream } from "web-streams-polyfill";

import { DEFAULT } from "../upload/defaults";
import { UploadType } from "../upload/Upload";
import { chunkFromBuffer } from "./buffer-helper";
import { chunkFromReadable } from "./readable-helper";
import { chunkFromReadableStream } from "./readable-stream-helper";

export interface DataPart {
  PartNumber: number;
  Body: Buffer | Uint8Array;
}

export function yieldChunk(data: UploadType.SendData, chunkSize: number): AsyncGenerator<DataPart, void, unknown> {
  let dataChunk;
  const size = Math.max(chunkSize, DEFAULT.MIN_PART_SIZE);
  if (data instanceof Readable) {
    dataChunk = chunkFromReadable(data, size);
  } else if (data instanceof ReadableStream) {
    dataChunk = chunkFromReadableStream(data, size);
  } else if (data instanceof Buffer) {
    dataChunk = chunkFromBuffer(data, size);
  } else if (typeof (data as Blob).stream === "function") {
    // approximate support for Blobs
    dataChunk = chunkFromReadableStream((data as any).stream(), size);
  } else if (data instanceof String || typeof data == "string" || data instanceof Uint8Array) {
    dataChunk = chunkFromBuffer(Buffer.from(data), size);
  } else {
    throw new Error("Data not one of InputStreamType");
  }
  return dataChunk;
}
