import { ECRClient } from "../ECRClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface ECRClientWaiter extends WaiterOptions {
  client: ECRClient;
}
