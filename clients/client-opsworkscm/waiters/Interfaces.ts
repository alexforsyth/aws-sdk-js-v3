import { OpsWorksCMClient } from "../OpsWorksCMClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface OpsWorksCMClientWaiter extends WaiterOptions {
  client: OpsWorksCMClient;
}
