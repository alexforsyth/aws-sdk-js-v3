import { EMRClient } from "../EMRClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface EMRClientWaiter extends WaiterOptions {
  client: EMRClient;
}
