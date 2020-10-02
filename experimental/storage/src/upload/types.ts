import { PutObjectCommandInput, S3, S3Client, Tag as Tag_ } from "@aws-sdk/client-s3";

export namespace Upload {
  export interface Progress {
    loaded?: number;
    total?: number;
    part?: number;
    Key?: string;
    Bucket?: string;
  }

  export interface S3Location {
    Key: string;
    Bucket: string;
  }

  export interface S3Target extends S3Location {
    service: S3;
  }
  export interface S3ClientTarget extends S3Location {
    service: S3Client;
  }

  export type Target = S3Target | S3ClientTarget;

  export type Tag = Tag_;

  export type SendData = PutObjectCommandInput["Body"];

  export interface Configuration {
    /**
     * The size of the concurrent queue manager to upload parts in parallel. Set to 1 for synchronous uploading of parts. Note that the uploader will buffer at most queueSize * partSize bytes into memory at any given time.
     * default: 4
     */
    queueSize: number;

    /**
     * Default: 5 mb
     * The size in bytes for each individual part to be uploaded. Adjust the part size to ensure the number of parts does not exceed maxTotalParts. See minPartSize for the minimum allowed part size.
     */
    partSize: number;

    /**
     * Default: false
     * Whether to abort the multipart upload if an error occurs. Set to true if you want to handle failures manually.
     */
    leavePartsOnError: boolean;

    /**
     * The tags to apply to the object.
     */
    tags: Tag_[];
  }

  // body : string | Buffer | Uint8Array | Blob | Readable
  export interface Options extends Partial<Configuration> {
    /**
     * The "Body" parameter of a put request. This is the data that is uploaded.
     */
    data: SendData;

    /**
     * A list of valid target service clients.
     * This the target where we upload data.
     */
    targets: Target[];
  }
}
