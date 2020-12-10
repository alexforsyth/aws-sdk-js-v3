import { GlacierClient } from "../GlacierClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface GlacierClientWaiter extends WaiterOptions {
  client: GlacierClient;
}
