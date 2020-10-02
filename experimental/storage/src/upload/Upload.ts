import { S3, S3Client, ServiceOutputTypes } from "@aws-sdk/client-s3";

import { Upload as UploadType } from "./types";
export { Upload as UploadType } from "./types";
import { EventEmitter } from "events";

import { DEFAULT } from "./defaults";
import { S3ClientUpload } from "./service-clients/S3ClientUpload";
import { S3Upload } from "./service-clients/S3Upload";
import { Uploader } from "./service-clients/Uploader";

export class Upload extends EventEmitter {
  data: UploadType.SendData;
  targets: UploadType.Target[];
  configuration: UploadType.Configuration;
  progress: (progress: UploadType.Progress) => void = () => {};
  uploaders: Uploader[] = [];
  uploadEvent = "";

  /**
   * Creates a managed upload object with a set of configuration options.
   */
  constructor(options: UploadType.Options) {
    super();
    this.data = options.data;
    this.targets = options.targets;

    const defaultOptions: UploadType.Configuration = {
      queueSize: DEFAULT.QUEUE_SIZE,
      partSize: DEFAULT.MIN_PART_SIZE,
      leavePartsOnError: DEFAULT.ABORT_ON_FAILURE,
      tags: [],
    };
    this.configuration = { ...defaultOptions, ...options };
  }

  /**
   * Aborts a managed upload, including all concurrent upload requests.
   */
  async abort(): Promise<void> {
    for (const uploader of this.uploaders) {
      await uploader.abort();
    }
  }

  /**
   * Initiates the managed upload for the payload.
   */
  async done(): Promise<ServiceOutputTypes[]> {
    for (const target of this.targets) {
      let uploader: Uploader | undefined;
      if (target.service instanceof S3) {
        uploader = new S3Upload(target as UploadType.S3Target, this.data, this.configuration);
      } else if (target.service instanceof S3Client) {
        uploader = new S3ClientUpload(target, this.data, this.configuration);
      }

      // add progress listener to upload object
      if (uploader !== undefined) {
        this.uploaders.push(uploader);
        uploader.on(uploader.uploadEvent, (output: UploadType.Progress) => {
          this.emit(this.uploadEvent, output);
          this.progress(output);
        });
      }
    }

    // do upload one service at a time
    for (const uploader of this.uploaders) {
      await uploader.intialize();
      await uploader.upload();
    }

    // complete uploads in parallel
    const completedUploads: Promise<ServiceOutputTypes>[] = [];
    for (const uploader of this.uploaders) {
      completedUploads.push(uploader.complete());
    }
    return Promise.all(completedUploads);
  }

  /**
   * Adds a listener that is triggered when theuploader has uploaded more data.
   *
   * @param {string} event - httpUploadProgress: triggered when the uploader has uploaded more data.
   * @param {function} listener - Callback to run when the uploader has uploaded more data.
   */
  on(event: "httpUploadProgress", listener: (progress: UploadType.Progress) => void): any {
    this.uploadEvent = event;
    this.progress = listener;
  }
}
