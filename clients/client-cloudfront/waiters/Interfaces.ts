import { CloudFrontClient } from "../CloudFrontClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface CloudFrontClientWaiter extends WaiterOptions {
  client: CloudFrontClient;
}
