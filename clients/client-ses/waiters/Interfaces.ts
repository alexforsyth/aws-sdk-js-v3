import { SESClient } from "../SESClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface SESClientWaiter extends WaiterOptions {
  client: SESClient;
}
