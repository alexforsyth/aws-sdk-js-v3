import { UploadType } from "./upload/Upload";
import { Upload } from "./upload/upload";

export class Storage implements Storage {
  constructor() {}
  upload(params: UploadType.Options): Upload {
    return new Upload(params);
  }
}
