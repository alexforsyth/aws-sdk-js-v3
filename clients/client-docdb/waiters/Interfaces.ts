import { DocDBClient } from "../DocDBClient";
import { WaiterOptions } from "@aws-sdk/util-waiter";

export interface DocDBClientWaiter extends WaiterOptions {
  client: DocDBClient;
}
