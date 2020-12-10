import { SignerClient } from "../SignerClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface SignerClientWaiter extends WaiterOptions {
  client: SignerClient;
}
