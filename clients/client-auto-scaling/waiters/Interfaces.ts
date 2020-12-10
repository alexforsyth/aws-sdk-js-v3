import { AutoScalingClient } from "../AutoScalingClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface AutoScalingClientWaiter extends WaiterOptions {
  client: AutoScalingClient;
}
