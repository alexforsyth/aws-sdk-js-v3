import { S3Client } from "../S3Client";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface S3ClientWaiter extends WaiterOptions {
  client: S3Client;
}
