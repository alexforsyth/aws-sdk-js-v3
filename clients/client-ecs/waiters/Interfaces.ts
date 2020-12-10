import { ECSClient } from "../ECSClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface ECSClientWaiter extends WaiterOptions {
  client: ECSClient;
}
