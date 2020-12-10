import { EKSClient } from "../EKSClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface EKSClientWaiter extends WaiterOptions {
  client: EKSClient;
}
