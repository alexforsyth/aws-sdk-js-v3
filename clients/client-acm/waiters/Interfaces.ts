import { ACMClient } from "../ACMClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface ACMClientWaiter extends WaiterOptions {
  client: ACMClient;
}
