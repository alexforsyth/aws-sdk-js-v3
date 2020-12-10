import { CloudWatchClient } from "../CloudWatchClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface CloudWatchClientWaiter extends WaiterOptions {
  client: CloudWatchClient;
}
