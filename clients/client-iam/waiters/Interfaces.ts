import { IAMClient } from "../IAMClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface IAMClientWaiter extends WaiterOptions {
  client: IAMClient;
}
