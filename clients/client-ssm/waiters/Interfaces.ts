import { SSMClient } from "../SSMClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface SSMClientWaiter extends WaiterOptions {
  client: SSMClient;
}
