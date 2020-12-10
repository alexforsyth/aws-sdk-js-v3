import { NeptuneClient } from "../NeptuneClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface NeptuneClientWaiter extends WaiterOptions {
  client: NeptuneClient;
}
