import {
  AbortMultipartUploadRequest,
  CompleteMultipartUploadRequest,
  CreateMultipartUploadRequest,
  ServiceOutputTypes,
  UploadPartCommandInput,
  UploadPartCommandOutput,
} from "@aws-sdk/client-s3";

import { yieldChunk } from "../../data-chunk/yield-chunk";
import { UploadType } from "../Upload";
import { MultiPartIdentity, Uploader } from "./Uploader";

export class S3Upload extends Uploader {
  target: UploadType.S3Target;
  destination: MultiPartIdentity;

  constructor(
    serviceTarget: UploadType.S3Target,
    data_: UploadType.SendData,
    configuration_: UploadType.Configuration
  ) {
    super(yieldChunk(data_, configuration_.partSize), configuration_);
    this.target = serviceTarget;
    this.destination = {
      Key: this.target.Key,
      Bucket: this.target.Bucket,
      UploadId: "", // filled on initialization
    };
  }

  async _initiateUpload(command: CreateMultipartUploadRequest): Promise<ServiceOutputTypes> {
    return this.target.service.createMultipartUpload(command);
  }
  async _uploadPart(command: UploadPartCommandInput): Promise<UploadPartCommandOutput> {
    return this.target.service.uploadPart(command);
  }
  async _completeMultipartUpload(command: CompleteMultipartUploadRequest): Promise<ServiceOutputTypes> {
    return this.target.service.completeMultipartUpload(command);
  }
  async _abortUpload(command: AbortMultipartUploadRequest): Promise<ServiceOutputTypes> {
    return this.target.service.abortMultipartUpload(command);
  }
}
